import Modal from '../common/Modal'
import './NewsPostModal.css'

const sanityImageConfig = {
    projectId: '',
    dataset: '',
}

export function configureNewsPostModalSanity({ projectId, dataset }) {
    sanityImageConfig.projectId = projectId || ''
    sanityImageConfig.dataset = dataset || ''
}

function formatPublishedDate(publishedAt) {
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

function getSanityImagePathFromRef(assetRef) {
    if (typeof assetRef !== 'string') {
        return ''
    }

    const match = assetRef.match(/^image-(.+)-(\d+x\d+)-([a-z0-9]+)$/i)

    if (!match) {
        return ''
    }

    const [, assetId, dimensions, extension] = match
    return `${assetId}-${dimensions}.${extension}`
}

function getSanityImageUrl(assetRef) {
    if (!sanityImageConfig.projectId || !sanityImageConfig.dataset) {
        const envProjectId = import.meta.env.VITE_SANITY_PROJECT_ID || ''
        const envDataset = import.meta.env.VITE_SANITY_DATASET || ''

        sanityImageConfig.projectId = sanityImageConfig.projectId || envProjectId
        sanityImageConfig.dataset = sanityImageConfig.dataset || envDataset
    }

    if (!sanityImageConfig.projectId || !sanityImageConfig.dataset) {
        return ''
    }

    const imagePath = getSanityImagePathFromRef(assetRef)

    if (!imagePath) {
        return ''
    }

    return `https://cdn.sanity.io/images/${sanityImageConfig.projectId}/${sanityImageConfig.dataset}/${imagePath}`
}

function getPortableTextContent(body) {
    if (!Array.isArray(body)) {
        return []
    }

    return body
        .map((block, index) => {
            if (block?._type === 'block' && Array.isArray(block.children)) {
                const text = block.children
                .filter((child) => child?._type === 'span' && typeof child.text === 'string')
                .map((child) => child.text)
                .join('')
                .replace(/\s+/g, ' ')
                .trim()

                if (!text) {
                    return null
                }

                return {
                    type: 'text',
                    key: block._key || `text-${index}`,
                    text,
                }
            }

            if (block?._type === 'image') {
                const imageUrl = getSanityImageUrl(block?.asset?._ref)

                if (!imageUrl) {
                    return null
                }

                return {
                    type: 'image',
                    key: block._key || `image-${index}`,
                    src: imageUrl,
                    alt: typeof block?.alt === 'string' ? block.alt : 'Blog post image',
                }
            }

            return null
        })
        .filter(Boolean)
}

function NewsPostModal({ post, originRect, isClosing = false, onClose }) {
    if (!post) {
        return null
    }

    const bodyContent = getPortableTextContent(post.body)

    return (
        <Modal
            isOpen={Boolean(post)}
            onClose={onClose}
            labelledBy="news-modal-title"
            closeLabel="Close post details"
            modalClassName="book-modal news-modal"
            originRect={originRect}
            isClosing={isClosing}
        >
            <div className="news-modal-content">
                <h2 id="news-modal-title" className="book-modal-title">
                    {post.title}
                </h2>

                <p className="book-modal-meta">
                    <b>Publication Date:</b> {formatPublishedDate(post.publishedAt)}
                </p>

                <div className="news-modal-body">
                    {bodyContent.length > 0 ? (
                        bodyContent.map((contentItem) => {
                            if (contentItem.type === 'image') {
                                return (
                                    <figure key={contentItem.key} className="news-modal-image-wrapper">
                                        <img
                                            src={contentItem.src}
                                            alt={contentItem.alt}
                                            className="news-modal-image"
                                            loading="lazy"
                                        />
                                    </figure>
                                )
                            }

                            return <p key={contentItem.key}>{contentItem.text}</p>
                        })
                    ) : (
                        <p className="news-modal-fallback">
                            No body content is available for this post yet.
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default NewsPostModal
