const SEARCH_API_URL = "http://localhost:8080/search"

export async function search(query) {
    const response = await fetch(`${SEARCH_API_URL}/?term=${encodeURIComponent(query)}`)

    if(!response.ok) throw new Error('Failed to get search results');
    
    return await response.json();
}