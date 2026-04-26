const LIKED_CONTENT_KEY = "likedContentIds";

const getLikedContentIds = () => {
  try {
    const stored = localStorage.getItem(LIKED_CONTENT_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
};

const saveLikedContentIds = (ids) => {
  try {
    localStorage.setItem(LIKED_CONTENT_KEY, JSON.stringify(ids));
  } catch (error) {
  }
};

export function isContentLiked(contentId) {
  return getLikedContentIds().includes(String(contentId));
};

export function addLikedContent(contentId) {
  const ids = getLikedContentIds();
  const id = String(contentId);

  if (!ids.includes(id)) {
    ids.push(id);
    saveLikedContentIds(ids);
  }
};

export function removeLikedContent(contentId) {
  const id = String(contentId);
  const updatedIds = getLikedContentIds().filter((likedId) => likedId !== id);
  saveLikedContentIds(updatedIds);
};