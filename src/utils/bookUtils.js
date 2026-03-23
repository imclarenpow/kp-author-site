export function getBookKey(book) {
    return `${book.title}-${book.series}`
}

export function getBookCoverSrc(cover) {
    if (typeof cover !== 'string' || cover.length === 0) {
        return ''
    }

    if (/^https?:\/\//i.test(cover)) {
        return cover
    }

    return `/assets/img/covers/${cover}`
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
