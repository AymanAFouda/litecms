import { getAuthHeaders } from "../utils/publisherAuth"
const ARTICLE_API_URL = "http://localhost:8080/articles"

export async function getArticles() {
    const response = await fetch(ARTICLE_API_URL);
    if(!response.ok) throw new Error('Failed to fetch Articles');
    
    return await response.json();
}

export async function getArticle(id) {
    const response = await fetch(`${ARTICLE_API_URL}/${id}`);
    if(!response.ok) throw new Error('Failed to fetch Article');
    
    return await response.json();
}

export async function createArticle(article) {
    const response = await fetch(ARTICLE_API_URL, {
        method: 'POST',
        body: article,
    })

    if(!response.ok) throw new Error('Failed to create Article');
    
    return await response.json();
}

export async function updateArticle(id, article) {
    const response = await fetch(`${ARTICLE_API_URL}/${id}`, {
        method: 'PUT',
        body: article,
    })

    if(!response.ok) throw new Error('Failed to edit Article');
    
    return await response.json();
}

export async function deleteArticle(id) {
    const response = await fetch(`${ARTICLE_API_URL}/${id}`, {
        method: 'DELETE',
    })

    if(!response.ok) throw new Error('Failed to delete Article');
}