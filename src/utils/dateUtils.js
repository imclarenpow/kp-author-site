export function formatPublishedDate(publishedAt) {
    if (!publishedAt) {
        return 'Date not set'
    }

    const parsedDate = new Date(publishedAt)

    if (Number.isNaN(parsedDate.getTime())) {
        return 'Date not set'
    }

    return parsedDate.toLocaleDateString('en-NZ', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}
