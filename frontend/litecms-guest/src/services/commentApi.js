const BASE_API_URL = "http://localhost:8080/api/comments"

export async function getComments(contentId) {
    const response = await fetch(`${BASE_API_URL}/content/${contentId}`)

    if(!response.ok) throw new Error('Failed to fetch comments');
    return await response.json();
}

export async function createComment(comment, contentId) {
    console.log(comment)
    const response = await fetch(`${BASE_API_URL}/${contentId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    })

    if(!response.ok) throw new Error('Failed to create comment');
    return await response.json();
}