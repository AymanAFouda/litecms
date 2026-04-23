import { API_BASE_URL } from "./apiConfig";

const TAG_API_BASE_URL = API_BASE_URL + "/tags"

export async function getTags() {
    const response = await fetch(TAG_API_BASE_URL);

    if(!response.ok) throw new Error('Failed to fetch tags');
    return await response.json();
}

export async function getPopularTags() {
    const response = await fetch(`${TAG_API_BASE_URL}/popular`);

    if(!response.ok) throw new Error('Failed to fetch popular tags');
    return await response.json();
}