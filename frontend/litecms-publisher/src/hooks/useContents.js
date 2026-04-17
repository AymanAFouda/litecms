import { useState, useEffect } from "react"

import { getArticles } from "../services/articleApi"
import { getVideos } from "../services/videoApi";
import { getGalleries } from "../services/galleryApi"

export function useContents(contentType) {
    const [contents, setContents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContents = async () => {
            setIsLoading(true);
            try {
                if(contentType == 'articles') {
                    const data = await getArticles();
                    setContents(data);
                } else if(contentType == 'videos') {
                    const data = await getVideos();
                    setContents(data);
                } else if(contentType == 'galleries') {
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

    return { contents, setContents, isLoading, loadError };
}