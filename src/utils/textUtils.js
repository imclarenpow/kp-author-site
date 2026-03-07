export function stripHtmlTags(value = '') {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function truncateText(value = '', maxLength = 60) {
    if (value.length <= maxLength) {
        return value
    }

    return `${value.slice(0, maxLength).trimEnd()}...`
}
