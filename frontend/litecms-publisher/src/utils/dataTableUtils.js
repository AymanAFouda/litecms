export const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const  statusColorMap = {
    DRAFT: "bg-secondary",
    PUBLISHED: "bg-success",
    ARCHIVED: "bg-info",
};