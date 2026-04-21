const BASE_API_URL = "http://localhost:8080/api"

export async function getTags() {
    const response = await fetch(`${BASE_API_URL}/tags`);

    if(!response.ok) throw new Error('Failed to fetch tags');
    return await response.json();
}

export async function getPopularTags() {
    const response = await fetch(`${BASE_API_URL}/tags/popular`);

    if(!response.ok) throw new Error('Failed to fetch popular tags');
    return await response.json();
}