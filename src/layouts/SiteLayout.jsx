import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../components/layout/SiteFooter'
import SiteHeader from '../components/layout/SiteHeader'
import { pageDescriptions, pageTitles, siteMeta } from '../config/siteConfig'
import './SiteLayout.css'

function upsertMetaTag(attribute, key, content) {
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

function upsertCanonicalLink(href) {
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

function SiteLayout() {
    const location = useLocation()

    useEffect(() => {
        const title = pageTitles[location.pathname] ?? 'Keryn Powell | Author'
        const description = pageDescriptions[location.pathname] ?? siteMeta.defaultDescription
        const canonicalUrl = `${window.location.origin}${location.pathname}`
        const shareImageUrl = `${window.location.origin}${siteMeta.defaultShareImage}`

        document.title = title

        upsertMetaTag('name', 'description', description)
        upsertMetaTag('property', 'og:type', 'website')
        upsertMetaTag('property', 'og:title', title)
        upsertMetaTag('property', 'og:description', description)
        upsertMetaTag('property', 'og:url', canonicalUrl)
        upsertMetaTag('property', 'og:image', shareImageUrl)
        upsertMetaTag('name', 'twitter:card', 'summary_large_image')
        upsertMetaTag('name', 'twitter:title', title)
        upsertMetaTag('name', 'twitter:description', description)
        upsertMetaTag('name', 'twitter:image', shareImageUrl)
        upsertCanonicalLink(canonicalUrl)
    }, [location.pathname])

    return (
        <div className="site-shell">
            <SiteHeader />
            <main className="site-main">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    )
}

export default SiteLayout