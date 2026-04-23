import { API_BASE_URL } from "./apiConfig";

const CATEGORY_API_BASE_URL = API_BASE_URL + "/categories"

export async function getCategories() {
    const response = await fetch(CATEGORY_API_BASE_URL);

    if(!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
}

export async function getCategoriesAndCounts() {
    const response = await fetch(`${CATEGORY_API_BASE_URL}/count`);

    if(!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
}