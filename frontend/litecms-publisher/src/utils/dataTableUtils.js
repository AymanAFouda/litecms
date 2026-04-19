export const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const statusColorMap = {
    DRAFT: "draft-badge",
    PUBLISHED: "published-badge",
    ARCHIVED: "archived-badge",
};

export const contentTypeText = {
    ARTICLE: "Article",
    VIDEO: "Video",
    PHOTOGALLERY: "Photo Gallery",
};

export const editButtonUrl = {
    ARTICLE: "articles",
    VIDEO: "videos",
    PHOTOGALLERY: "galleries",
};