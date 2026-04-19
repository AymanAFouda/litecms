const BASE_API_URL = "http://localhost:8080"

export async function getAllContent() {
    const response = await fetch(`${BASE_API_URL}/contents`);

    if(!response.ok) throw new Error('Failed to fetch Content');
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
    const response = await fetch(`${BASE_API_URL}/galleries`);

    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    return await response.json();
}

export async function getRecentThreeContent() {
    const response = await fetch(`${BASE_API_URL}/contents/latest-three`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getContentById(id) {
    const response = await fetch(`${BASE_API_URL}/contents/${id}`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function likeContent(id) {
    const response = await fetch(`${BASE_API_URL}/contents/like/${id}`, {
        method: 'PUT'
    })

    if(!response.ok) throw new Error('Failed to create Article');
    return await response.json();
}

export async function unlikeContent(id) {
    const response = await fetch(`${BASE_API_URL}/contents/unlike/${id}`, {
        method: 'PUT'
    })

    if(!response.ok) throw new Error('Failed to create Article');
    return await response.json();
}

export async function viewContent(id) {
    const response = await fetch(`${BASE_API_URL}/contents/view/${id}`, {
        method: 'PUT'
    })

    if(!response.ok) throw new Error('Failed to create Article');
    return await response.json();
}