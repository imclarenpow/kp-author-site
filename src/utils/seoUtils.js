export function upsertMetaTag(attribute, key, content) {
    if (!content) {
        return
    }

    let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)

    if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.appendChild(tag)
    }

    tag.setAttribute('content', content)
}

export function upsertCanonicalLink(href) {
    if (!href) {
        return
    }

    let link = document.head.querySelector('link[rel="canonical"]')

    if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
    }

    link.setAttribute('href', href)
}

export function buildAbsoluteUrl(pathname = '') {
    return `${window.location.origin}${pathname}`
}
