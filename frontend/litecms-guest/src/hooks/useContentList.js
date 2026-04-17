import { useState, useEffect } from "react"
import { getContent, getArticles, getVideos, getGalleries } from "../services/contentListApi"

export function useContentList(contentType) {
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContents = async () => {
            setIsLoading(true);
            try {
                if(contentType === 'all') {
                    const data = await getContent();
                    setContents(data);
                } else if(contentType === 'articles') {
                    const data = await getArticles();
                    setContents(data);
                } else if(contentType === 'videos') {
                    const data = await getVideos();
                    setContents(data);
                } else if(contentType === 'galleries') {
                    const data = await getGalleries();
                    setContents(data);
                }
                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContents();
    }, []);

    return { contents, isLoading, loadError };
}