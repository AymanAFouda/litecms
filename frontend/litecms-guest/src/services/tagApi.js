const BASE_API_URL = "http://localhost:8080"

export async function getTags() {
    const response = await fetch(`${BASE_API_URL}/tags`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getPopularTags() {
    const response = await fetch(`${BASE_API_URL}/tags/popular`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getContentByTag(name) {
    const response = await fetch(`${BASE_API_URL}/contents/tag/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getArticlesByTag(name) {
    const response = await fetch(`${BASE_API_URL}/articles/tag/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Articles');
    return await response.json();
}

export async function getVideosByTag(name) {
    const response = await fetch(`${BASE_API_URL}/videos/tag/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Videos'); 
    return await response.json();
}

export async function getGalleriesByTag(name) {
    const response = await fetch(`${BASE_API_URL}/galleries/tag/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    return await response.json();
}