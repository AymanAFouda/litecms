import { useState, useEffect } from "react";
import { getTags, getPopularTags } from "../services/tagApi";

export function useTags() {
    const [tagList, setTagList] = useState([]);
    const [tagsAreLoading, setTagsAreLoading] = useState(false);
    const [tagsLoadError, setTagsLoadError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            setTagsAreLoading(true);
            try {
                const data = await getTags();
                setTagList(data);
                
                setTagsLoadError(null);
            } catch (er) {
                setTagsLoadError(er);
            } finally {
                setTagsAreLoading(false);
            }
        };

        fetchTags();
    }, []);

    return { tagList, tagsAreLoading, tagsLoadError };
}

export function usePopularTags() {
    const [popularTagList, setPopularTagList] = useState([]);
    const [popularTagsAreLoading, setPopularTagsAreLoading] = useState(false);
    const [popularTagsLoadError, setPopularTagsLoadError] = useState(null);

    useEffect(() => {
        const fetchPopularTags = async () => {
            setPopularTagsAreLoading(true);
            try {
                const data = await getPopularTags();
                setPopularTagList(data);
                
                setPopularTagsLoadError(null);
            } catch (er) {
                setPopularTagsLoadError(er);
            } finally {
                setPopularTagsAreLoading(false);
            }
        };

        fetchPopularTags();
    }, []);

    return { popularTagList, popularTagsAreLoading, popularTagsLoadError };
}