import { API_BASE_URL } from "./apiConfig";

const SEARCH_API_BASE_URL = API_BASE_URL + "/search"

export async function search(query, filters = {}) {
  const params = new URLSearchParams();

  if (query?.trim()) params.append("query", query.trim());

  if (
    filters.contentType &&
    filters.contentType !== "All content"
  ) {
    params.append("contentType", filters.contentType);
  }

  if (filters.category?.trim()) {
    params.append("categoryName", filters.category.trim());
  }

  if (filters.tag?.trim()) {
    params.append("tagName", filters.tag.trim());
  }

  const response = await fetch(`${SEARCH_API_BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return await response.json();
}

export async function getRelatedContent(contentId) {
    const response = await fetch(`${SEARCH_API_BASE_URL}/related/${contentId}`);

    if(!response.ok) throw new Error('Failed to fetch related content');
    return await response.json();
}