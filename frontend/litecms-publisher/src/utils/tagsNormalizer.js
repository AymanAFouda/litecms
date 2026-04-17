export const normalizeTags = (tags = []) => {
    const seen = new Set();

    return tags
        .map(tag => {
            const raw = tag.value.trim();

            const normalized = raw
                .toUpperCase()
                .replace(/\s+/g, "-");

            return {
                label: normalized,
                value: normalized
            };
        })
        .filter(tag => {
            if (!tag.value) return false;
            if (seen.has(tag.value)) return false;

            seen.add(tag.value);
            return true;
        });
};