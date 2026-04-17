import { getAuthHeaders } from "../utils/publisherAuth"
const video_API_URL = "http://localhost:8080/videos"

export async function getVideos() {
    const response = await fetch(video_API_URL);
    if(!response.ok) throw new Error('Failed to fetch Videos');
    
    return await response.json();
}

export async function getVideo(id) {
    const response = await fetch(`${video_API_URL}/${id}`);
    if(!response.ok) throw new Error('Failed to fetch Video');
    
    return await response.json();
}

export async function createVideo(video) {
    const response = await fetch(video_API_URL, {
        method: 'POST',
        body: video,
    })

    if(!response.ok) throw new Error('Failed to create Video');
    
    return await response.json();
}

export async function updateVideo(id, video) {
    const response = await fetch(`${video_API_URL}/${id}`, {
        method: 'PUT',
        body: video,
    })

    if(!response.ok) throw new Error('Failed to edit Video');
    
    return await response.json();
}

export async function deleteVideo(id) {
    const response = await fetch(`${video_API_URL}/${id}`, {
        method: 'DELETE',
    })

    if(!response.ok) throw new Error('Failed to delete Video');
}