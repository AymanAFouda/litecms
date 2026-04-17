import { useState, useEffect } from "react"
import { search } from "../services/searchApi"

export function useSearchByQuery(query, searchTrigger) {
    const [results, setResults] = useState(null);
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query?.trim()) {
                setResults([]);
                setTotal(0);
                setLoadError(null);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);

            try {
                const data = await search(query);
                console.log(data);

                setTotal(data?.hits?.total?.value ?? 0);
                setResults(
                    (data?.hits?.hits ?? []).map((hit) => ({
                        id: hit._id,
                        title: hit._source?.title ?? "",
                        featuredImage: hit._source?.featuredImage?.fileUrl ?? null,
                        category: hit._source?.category?.name ?? "",
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

        fetchResults();
    }, [query, searchTrigger]);

    return { results, total, isLoading, loadError };
}