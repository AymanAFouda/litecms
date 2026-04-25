import { API_BASE_URL } from "./apiConfig";
import { getAuthHeaders } from "../utils/publisherAuth"
const PHOTO_GALLERY_API_URL = API_BASE_URL + "/api/publisher/galleries"

export async function getGalleries() {
    const response = await fetch(PHOTO_GALLERY_API_URL, {
        headers: getAuthHeaders(),
    });
    if(!response.ok) throw new Error('Failed to fetch Photo Galleries');
    
    const galleries = await response.json();
    return galleries;
}

export async function getGallery(id) {
    const response = await fetch(`${PHOTO_GALLERY_API_URL}/${id}`, {
        headers: getAuthHeaders(),
    });
    if(!response.ok) throw new Error('Failed to fetch Photo Gallery');
    
    return await response.json();
}

export async function createGallery(gallery) {
    const response = await fetch(PHOTO_GALLERY_API_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: gallery,
    })

    if(!response.ok) throw new Error('Failed to create Photo Gallery');
    
    return await response.json();
}

export async function updateGallery(id, gallery) {
    const response = await fetch(`${PHOTO_GALLERY_API_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: gallery,
    })

    if(!response.ok) throw new Error('Failed to edit Photo Gallery');
    
    return await response.json();
}

export async function deleteGallery(id) {
    const response = await fetch(`${PHOTO_GALLERY_API_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    })

    if(!response.ok) throw new Error('Failed to delete Photo Gallery');
}