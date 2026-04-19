import { useState, useEffect } from "react"
import { getAllContent, getArticles, getVideos, getGalleries, getContentById } from "../services/contentApi"

export function useContent(contentType) {
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContents = async () => {
            setIsLoading(true);
            try {
                if(contentType === 'all') {
                    const data = await getAllContent();
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

export function useContentById(contentId) {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContentById = async () => {
            setIsLoading(true);
            try {
                const data = await getContentById(contentId);
                setContent(data);
                
                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContentById();
    }, [contentId]);

    return { content, isLoading, loadError };
}