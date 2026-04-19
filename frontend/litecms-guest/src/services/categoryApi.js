const BASE_API_URL = "http://localhost:8080"

export async function getCategories() {
    const response = await fetch(`${BASE_API_URL}/categories`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getCategoriesAndCounts() {
    const response = await fetch(`${BASE_API_URL}/categories/count`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getContentByCategory(name) {
    const response = await fetch(`${BASE_API_URL}/contents/category/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Content');
    return await response.json();
}

export async function getArticlesByCategory(name) {
    const response = await fetch(`${BASE_API_URL}/articles/category/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Articles');
    return await response.json();
}

export async function getVideosByCategory(name) {
    const response = await fetch(`${BASE_API_URL}/videos/category/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Videos'); 
    return await response.json();
}

export async function getGalleriesByCategory(name) {
    const response = await fetch(`${BASE_API_URL}/galleries/category/${name}`);

    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    return await response.json();
}