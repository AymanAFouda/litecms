import { useState, useEffect } from "react"
import { getStats, getLatestContent } from "../services/dashboardApi"

export function usePublisherDashboard() {
    const [stats, setStats] = useState([]);
    const [latestContent, setLatestContent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getStats();
                setStats(data);

                const content = await getLatestContent();
                setLatestContent(content);
                console.log(content)

                setLoadError(null);
            } catch (er) {
                setLoadError(er);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { stats, latestContent, setLatestContent, isLoading, loadError };
}