import { useState, useEffect } from "react";
import { getAllContent, getArticles,
    getVideos, getGalleries, getContentById, 
    incrementContentViewCount, getRecentThreeContent, 
    getContentByCategory, getArticlesByCategory, 
    getGalleriesByCategory, getVideosByCategory,
    getContentByTag, getArticlesByTag,
    getGalleriesByTag, getVideosByTag
} from "../services/contentApi";

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

                incrementContentViewCount(contentId);
                setContent(prev => ({
                    ...prev,
                    viewCount: prev.viewCount + 1
                }))

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

export function useContent(contentType) {
    const [contentList, setContentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                if(contentType === 'all') {
                    const data = await getAllContent();
                    setContentList(data);
                } else if(contentType === 'articles') {
                    const data = await getArticles();
                    setContentList(data);
                } else if(contentType === 'videos') {
                    const data = await getVideos();
                    setContentList(data);
                } else if(contentType === 'galleries') {
                    const data = await getGalleries();
                    setContentList(data);
                }
                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [contentType]);

    return { contentList, isLoading, loadError };
}

export function useContentByCategory(selectedTab, name) {
    const [contentList, setContentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {                    
                if(selectedTab === 'Articles') {
                    const data = await getArticlesByCategory(name);
                    setContentList(data);
                } else if(selectedTab === 'Videos') {
                    const data = await getVideosByCategory(name);
                    setContentList(data);
                } else if(selectedTab === 'Galleries') {
                    const data = await getGalleriesByCategory(name);
                    setContentList(data);
                } else {
                    const data = await getContentByCategory(name);
                    setContentList(data);
                }
                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [selectedTab, name]);

    return { contentList, isLoading, loadError };
}

export function useContentByTag(selectedTab, name) {
    const [contentList, setContentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                if(selectedTab === 'Articles') {
                    const data = await getArticlesByTag(name);
                    setContentList(data);
                } else if(selectedTab === 'Videos') {
                    const data = await getVideosByTag(name);
                    setContentList(data);
                } else if(selectedTab === 'Galleries') {
                    const data = await getGalleriesByTag(name);
                    setContentList(data);
                } else {
                    const data = await getContentByTag(name);
                    setContentList(data);
                }
                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [selectedTab, name]);

    return { contentList, isLoading, loadError };
}

export function useRecentContent() {
    const [contentList, setContentList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const data = await getRecentThreeContent();
                setContentList(data);

                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, []);

    return { contentList, isLoading, loadError };
}