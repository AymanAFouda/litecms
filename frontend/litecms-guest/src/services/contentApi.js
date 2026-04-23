import { API_BASE_URL } from "./apiConfig";

export async function getContentById(id) {
    const response = await fetch(`${API_BASE_URL}/contents/${id}`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getAllContent() {
    const response = await fetch(`${API_BASE_URL}/contents`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getArticles() {
    const response = await fetch(`${API_BASE_URL}/articles`);

    if(!response.ok) throw new Error('Failed to fetch Articles');
    return await response.json();
}

export async function getVideos() {
    const response = await fetch(`${API_BASE_URL}/videos`);

    if(!response.ok) throw new Error('Failed to fetch Videos'); 
    return await response.json();
}

export async function getGalleries() {
    const response = await fetch(`${API_BASE_URL}/galleries`);

    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    return await response.json();
}

export async function getContentByTag(name) {
    const response = await fetch(`${API_BASE_URL}/contents/tag/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getArticlesByTag(name) {
    const response = await fetch(`${API_BASE_URL}/articles/tag/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Articles');
    return await response.json();
}

export async function getVideosByTag(name) {
    const response = await fetch(`${API_BASE_URL}/videos/tag/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Videos'); 
    return await response.json();
}

export async function getGalleriesByTag(name) {
    const response = await fetch(`${API_BASE_URL}/galleries/tag/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    return await response.json();
}

export async function getContentByCategory(name) {
    const response = await fetch(`${API_BASE_URL}/contents/category/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getArticlesByCategory(name) {
    const response = await fetch(`${API_BASE_URL}/articles/category/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Articles');
    return await response.json();
}

export async function getVideosByCategory(name) {
    const response = await fetch(`${API_BASE_URL}/videos/category/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Videos'); 
    return await response.json();
}

export async function getGalleriesByCategory(name) {
    const response = await fetch(`${API_BASE_URL}/galleries/category/${encodeURIComponent(name)}`);

    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    return await response.json();
}

export async function getRecentThreeContent() {
    const response = await fetch(`${API_BASE_URL}/contents/latest-three`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function likeContent(id) {
    const response = await fetch(`${API_BASE_URL}/contents/like/${id}`, {
        method: 'PUT'
    })

    if(!response.ok) throw new Error('Failed to like content');
}

export async function unlikeContent(id) {
    const response = await fetch(`${API_BASE_URL}/contents/unlike/${id}`, {
        method: 'PUT'
    })

    if(!response.ok) throw new Error('Failed to unlike content');
}

export async function incrementContentViewCount(id) {
    const response = await fetch(`${API_BASE_URL}/contents/view/${id}`, {
        method: 'PUT'
    })

    if(!response.ok) throw new Error('Failed to call API');
}