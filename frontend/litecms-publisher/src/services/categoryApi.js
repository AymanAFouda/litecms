import { API_BASE_URL } from "./apiConfig";
import { getAuthHeaders } from "../utils/publisherAuth"
const CATEGORY_API_URL = API_BASE_URL + "/api/publisher/categories"

export async function getCategories() {
    const response = await fetch("http://localhost:8080/api/categories");
    if(!response.ok) throw new Error('Failed to fetch Categories');
    
    const data = await response.json();
    return data;
}

export async function createCategory(categoryName) {
    const response = await fetch(CATEGORY_API_URL, {
        method: 'POST',
        headers: getAuthHeaders({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(categoryName),
    })

    if(!response.ok) throw new Error('Failed to create Category');
    
    return await response.json();
}

export async function updateCategory(category) {
    const response = await fetch(`${CATEGORY_API_URL}/${category.id}`, {
        method: 'PUT',
        headers: getAuthHeaders({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(category),
    })

    if(!response.ok) throw new Error('Failed to edit Category');
    
    return await response.json();
}

export async function deleteCategory(id) {
    const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    })

    if(!response.ok) throw new Error('Failed to delete Category');
}

