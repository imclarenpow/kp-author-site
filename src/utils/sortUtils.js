function normalizeTitle(title) {
    return typeof title === 'string' ? title : ''
}

function compareTitles(leftTitle, rightTitle, options = {}) {
    const { sensitivity = 'base', emptyLast = false } = options
    const left = normalizeTitle(leftTitle)
    const right = normalizeTitle(rightTitle)

    if (emptyLast) {
        if (!left && !right) {
            return 0
        }

        if (!left) {
            return 1
        }

        if (!right) {
            return -1
        }
    }

    return left.localeCompare(right, undefined, { sensitivity })
}

function compareObjectsByTitle(leftItem, rightItem, options = {}) {
    const {
        getTitle = (item) => item?.title,
        sensitivity = 'base',
        emptyLast = false,
    } = options

    return compareTitles(getTitle(leftItem), getTitle(rightItem), {
        sensitivity,
        emptyLast,
    })
}

export { compareObjectsByTitle, compareTitles }
