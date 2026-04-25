import { API_BASE_URL } from "./apiConfig";
import { getAuthHeaders } from "../utils/publisherAuth"
const STATS_API_URL = API_BASE_URL + "/api/publisher/stats"
const CONTENT_API_URL = API_BASE_URL + "/api/publisher/contents/latest-ten"

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