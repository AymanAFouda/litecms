const BASE_API_URL = "http://localhost:8080/api"

export async function getCategories() {
    const response = await fetch(`${BASE_API_URL}/categories`);

    if(!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
}

export async function getCategoriesAndCounts() {
    const response = await fetch(`${BASE_API_URL}/categories/count`);

    if(!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
}