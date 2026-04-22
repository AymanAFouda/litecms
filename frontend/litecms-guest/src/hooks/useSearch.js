import { useState, useEffect } from "react";
import { getRelatedContent, search } from "../services/searchApi";

export function useSearch(query, filters) {
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const fetchResults = async (overrideQuery = query, overrideFilters = filters) => {
        const hasQuery = overrideQuery?.trim();
        const hasFilter =
            (overrideFilters?.contentType && overrideFilters.contentType !== "All content") ||
            overrideFilters?.category?.trim() ||
            overrideFilters?.tag?.trim();

        if (!hasQuery && !hasFilter) {
            setResults([]);
            setTotal(0);
            setLoadError(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const data = await search(overrideQuery, overrideFilters);

            setTotal(data?.hits?.total?.value ?? 0);
            setResults(
                (data?.hits?.hits ?? []).map((hit) => ({
                    contentId: hit._id,
                    title: hit._source?.title ?? "",
                    featuredImage: hit._source?.featuredImage ?? null,
                    category: hit._source?.category ?? "",
                    createdAt: hit._source?.createdAt ?? "",
                    viewCount: hit._source?.viewCount ?? 0,
                    description: hit._source?.description ?? "",
                }))
            );

            setLoadError(null);
        } catch (er) {
            setResults([]);
            setTotal(0);
            setLoadError(er);
        } finally {
            setIsLoading(false);
        }
    };

    return { results, total, fetchResults, isLoading, loadError };
}

export function useSearchRelatedContent(contentId) {
    const [relatedContent, setRelatedContent] = useState([]);
    const [relatedContentLoading, setRelatedContentLoading] = useState(false);
    const [relatedContentLoadError, setRelatedContentLoadError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            if (!contentId) {
                setRelatedContent([]);
                return;
            }

            setRelatedContentLoading(true);
            try {
                const data = await getRelatedContent(contentId);
                setRelatedContent((data?.hits?.hits ?? []).map((hit) => ({
                    contentId: hit._id,
                    title: hit._source?.title ?? "",
                    featuredImage: hit._source?.featuredImage ?? null,
                    category: hit._source?.category ?? "",
                    createdAt: hit._source?.createdAt ?? "",
                    viewCount: hit._source?.viewCount ?? 0,
                    description: hit._source?.description ?? "",
                })));

                setRelatedContentLoadError(null);
            } catch (er) {
                setRelatedContentLoadError(er);
            } finally {
                setRelatedContentLoading(false);
            }
        };

        fetchContent();
    }, [contentId]);

    return { relatedContent, relatedContentLoading, relatedContentLoadError };
}