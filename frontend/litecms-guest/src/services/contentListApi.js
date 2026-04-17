
const BASE_API_URL = "http://localhost:8080"

export async function getContent() {
    const response = await fetch(`${BASE_API_URL}`);
    if(!response.ok) throw new Error('Failed to fetch Articles');
    return await response.json();
}

export async function getArticles() {
    const response = await fetch(`${BASE_API_URL}/articles`);
    if(!response.ok) throw new Error('Failed to fetch Articles');
    return await response.json();
}

export async function getVideos() {
    const response = await fetch(`${BASE_API_URL}/videos`);
    if(!response.ok) throw new Error('Failed to fetch Videos'); 
    return await response.json();
}

export async function getGalleries() {
    const response = await fetch(`${BASE_API_URL}/photoGalleries`);
    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    return await response.json();
}