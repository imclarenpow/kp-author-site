export function getBookKey(book) {
    return `${book.title}-${book.series}`
}

export function getBookCoverSrc(cover) {
    const fallbackCoverSrc = '/assets/img/covers/temp.png'

    if (typeof cover !== 'string') {
        return fallbackCoverSrc
    }

    const normalizedCover = cover.trim()

    if (normalizedCover.length === 0) {
        return fallbackCoverSrc
    }

    if (/^https?:\/\//i.test(normalizedCover)) {
        return normalizedCover
    }

    if (normalizedCover.startsWith('/')) {
        return normalizedCover
    }

    return `/assets/img/covers/${normalizedCover}`
}

export function getElementRect(element) {
    if (!element) {
        return null
    }

    const { top, left, width, height } = element.getBoundingClientRect()

    return {
        top,
        left,
        width,
        height,
    }
}
