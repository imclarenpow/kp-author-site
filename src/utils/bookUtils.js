export function getBookKey(book) {
    return `${book.title}-${book.series}`
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
