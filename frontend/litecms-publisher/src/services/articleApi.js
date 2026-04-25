import { API_BASE_URL } from "./apiConfig";
import { getAuthHeaders } from "../utils/publisherAuth"
const ARTICLE_API_URL = API_BASE_URL + "/api/publisher/articles"

export async function getArticles() {
    const response = await fetch(ARTICLE_API_URL, {
        headers: getAuthHeaders(),
    });
    if(!response.ok) throw new Error('Failed to fetch Articles');
    
    return await response.json();
}

export async function getArticle(id) {
    const response = await fetch(`${ARTICLE_API_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
    if(!response.ok) throw new Error('Failed to fetch Article');
    
    return await response.json();
}

export async function createArticle(article) {
    const response = await fetch(ARTICLE_API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: article,
    })

    if(!response.ok) throw new Error('Failed to create Article');
    
    return await response.json();
}

export async function updateArticle(id, article) {
    const response = await fetch(`${ARTICLE_API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: article,
    })

    if(!response.ok) throw new Error('Failed to edit Article');
    
    return await response.json();
}

export async function deleteArticle(id) {
    const response = await fetch(`${ARTICLE_API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    })

    if(!response.ok) throw new Error('Failed to delete Article');
}