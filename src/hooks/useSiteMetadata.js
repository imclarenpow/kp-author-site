import { useEffect } from 'react'
import { pageDescriptions, pageTitles, siteMeta } from '../config/siteConfig'
import { buildAbsoluteUrl, upsertCanonicalLink, upsertMetaTag } from '../utils/seoUtils'

const DEFAULT_TITLE = 'Keryn Powell | Author'

function useSiteMetadata(pathname) {
    useEffect(() => {
        const title = pageTitles[pathname] ?? DEFAULT_TITLE
        const description = pageDescriptions[pathname] ?? siteMeta.defaultDescription
        const canonicalUrl = buildAbsoluteUrl(pathname)
        const shareImageUrl = buildAbsoluteUrl(siteMeta.defaultShareImage)

        document.title = title

        const tags = [
            ['name', 'description', description],
            ['property', 'og:type', 'website'],
            ['property', 'og:title', title],
            ['property', 'og:description', description],
            ['property', 'og:url', canonicalUrl],
            ['property', 'og:image', shareImageUrl],
            ['name', 'twitter:card', 'summary_large_image'],
            ['name', 'twitter:title', title],
            ['name', 'twitter:description', description],
            ['name', 'twitter:image', shareImageUrl],
        ]

        tags.forEach(([attribute, key, content]) => {
            upsertMetaTag(attribute, key, content)
        })

        upsertCanonicalLink(canonicalUrl)
    }, [pathname])
}

export default useSiteMetadata
