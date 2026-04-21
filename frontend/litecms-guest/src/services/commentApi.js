const BASE_API_URL = "http://localhost:8080/api"

export async function getComments(contentId) {
    const response = await fetch(`${BASE_API_URL}/comments/${contentId}`)

    if(!response.ok) throw new Error('Failed to fetch comments');
    return await response.json();
}

export async function createComment(comment, contentId) {
    const response = await fetch(`${BASE_API_URL}/comments/${contentId}`, {
        method: 'POST',
        body: comment,
    })

    if(!response.ok) throw new Error('Failed to create comment');
    return await response.json();
}