import { useState, useEffect } from "react"
import { getArticle } from "../services/articleApi"
import { getVideo } from "../services/videoApi";
import { getGallery } from "../services/galleryApi";

export function useContent(contentType, id) {
    const [content, setContent] = useState(null);
    const [isLoading, setIsLoading] = useState(!!id);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchContent = async () => {
            setIsLoading(true);
            try {
                if(contentType == 'article') {
                    const data = await getArticle(id);
                    setContent(data);
                } else if(contentType == 'video') {
                    const data = await getVideo(id);
                    setContent(data);
                } else if(contentType == 'gallery') {
                    const data = await getGallery(id);
                    setContent(data);
                    console.log(data)
                }
                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [id]);

    return { content, isLoading, loadError };
}