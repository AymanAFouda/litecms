import { API_BASE_URL } from "./apiConfig";

const COMMENT_API_BASE_URL = API_BASE_URL + "/comments"

export async function getComments(contentId) {
    const response = await fetch(`${COMMENT_API_BASE_URL}/content/${contentId}`)

    if(!response.ok) throw new Error('Failed to fetch comments');
    return await response.json();
}

export async function createComment(comment, contentId) {
    const response = await fetch(`${COMMENT_API_BASE_URL}/${contentId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    })

    if(!response.ok) throw new Error('Failed to create comment');
    return await response.json();
}