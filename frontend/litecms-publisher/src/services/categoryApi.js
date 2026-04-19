import { getAuthHeaders } from "../utils/publisherAuth"
const CATEGORY_API_URL = "http://localhost:8080/publisher/categories"

export async function getCategories() {
    const response = await fetch(CATEGORY_API_URL);
    if(!response.ok) throw new Error('Failed to fetch Categories');
    
    const data = await response.json();
    return data;
}

export async function createCategory(categoryName) {
    const response = await fetch(CATEGORY_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryName),
    })

    if(!response.ok) throw new Error('Failed to create Category');
    
    return await response.json();
}

export async function updateCategory(category) {
    const response = await fetch(`${CATEGORY_API_URL}/${category.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
    })

    if(!response.ok) throw new Error('Failed to edit Category');
    
    return await response.json();
}

export async function deleteCategory(id) {
    const response = await fetch(`${CATEGORY_API_URL}/${id}`, {
        method: 'DELETE',
    })

    if(!response.ok) throw new Error('Failed to delete Category');
}

