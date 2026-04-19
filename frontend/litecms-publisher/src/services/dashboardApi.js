import { getAuthHeaders } from "../utils/publisherAuth"
const STATS_API_URL = "http://localhost:8080/api/publisher/stats"
const CONTENT_API_URL = "http://localhost:8080/api/publisher/contents/latest-ten"

export async function getStats() {
    const response = await fetch(STATS_API_URL, {
        headers: getAuthHeaders(),
    });
    if(!response.ok) throw new Error('Failed to fetch stats');
    
    return await response.json();
}

export async function getLatestContent() {
    const response = await fetch(CONTENT_API_URL, {
        headers: getAuthHeaders(),
    });
    if(!response.ok) throw new Error('Failed to fetch recent content');
    
    return await response.json();
}