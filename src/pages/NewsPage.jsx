import { useCallback, useMemo, useState } from 'react'
import Card from '../components/common/Card'
import Dropdown from '../components/common/Dropdown'
import NewsPostModal from '../components/news/NewsPostModal'
import useCardModalController from '../hooks/useCardModalController'
import useNewsPosts from '../hooks/useNewsPosts'
import useUniformCardHeight from '../hooks/useUniformCardHeight'
import { formatPublishedDate } from '../utils/dateUtils'
import './NewsPage.css'

const SORT_OPTIONS = [
    {
        value: 'desc',
        label: 'Newest first',
    },
    {
        value: 'asc',
        label: 'Oldest first',
    },
]

const DEFAULT_SORT_ORDER = SORT_OPTIONS[0].value

function getPublishedTimestamp(post) {
    if (typeof post?.publishedAt !== 'string') {
        return null
    }

    const timestamp = Date.parse(post.publishedAt)
    return Number.isNaN(timestamp) ? null : timestamp
}

function comparePostsByPublishedDateWithTimestamps(leftEntry, rightEntry, sortOrder) {
    const leftTimestamp = leftEntry.publishedTimestamp
    const rightTimestamp = rightEntry.publishedTimestamp
    const leftPost = leftEntry.post
    const rightPost = rightEntry.post

    if (leftTimestamp == null && rightTimestamp == null) {
        const leftTitle = typeof leftPost?.title === 'string' ? leftPost.title : ''
        const rightTitle = typeof rightPost?.title === 'string' ? rightPost.title : ''

        return leftTitle.localeCompare(rightTitle)
    }

    if (leftTimestamp == null) {
        return 1
    }

    if (rightTimestamp == null) {
        return -1
    }

    const timestampDifference =
        sortOrder === 'asc' ? leftTimestamp - rightTimestamp : rightTimestamp - leftTimestamp

    if (timestampDifference !== 0) {
        return timestampDifference
    }

    const leftTitle = typeof leftPost?.title === 'string' ? leftPost.title : ''
    const rightTitle = typeof rightPost?.title === 'string' ? rightPost.title : ''
    return leftTitle.localeCompare(rightTitle)
}

function NewsPage() {
    const { posts, isLoading, errorMessage } = useNewsPosts()
    const [sortOrder, setSortOrder] = useState(DEFAULT_SORT_ORDER)
    const sortedPosts = useMemo(() => {
        const postsWithTimestamps = posts.map((post) => ({
            post,
            publishedTimestamp: getPublishedTimestamp(post),
        }))

        postsWithTimestamps.sort((leftEntry, rightEntry) =>
            comparePostsByPublishedDateWithTimestamps(leftEntry, rightEntry, sortOrder),
        )

        return postsWithTimestamps.map((entry) => entry.post)
    }, [posts, sortOrder])
    const getPostKey = useCallback((post) => post?.key || '', [])
    const {
        selectedItem: selectedPost,
        hiddenItemKey: hiddenPostKey,
        modalOriginRect,
        isModalClosing,
        openItemModal: openPostModal,
        closeItemModal: closePostModal,
    } = useCardModalController({
        getItemKey: getPostKey,
    })
    const newsFeedListRef = useUniformCardHeight({
        cardSelector: '.news-post-card',
        cssVarName: '--news-post-card-height',
        items: sortedPosts,
        enabled: sortedPosts.length > 0,
    })

    function handlePostClick(post, event, activationElement) {
        openPostModal(post, activationElement || event.currentTarget)
    }

    return (
        <section className="page-container news-page-container">
            <section className="news-feed" aria-labelledby="news-feed-title">
                <div className="news-feed-header">
                    <h2 id="news-feed-title" className="news-feed-title">
                        Blog Posts
                    </h2>

                    <div className="news-feed-controls">
                        <Dropdown
                            id="news-post-sort-order"
                            className="news-sort-dropdown"
                            ariaLabel="Sort blog posts by publication date"
                            value={sortOrder}
                            onChange={setSortOrder}
                            options={SORT_OPTIONS}
                            disabled={isLoading || Boolean(errorMessage) || posts.length < 2}
                        />
                    </div>
                </div>

                {isLoading ? <p className="news-feed-status">Loading posts...</p> : null}
                {errorMessage ? <p className="news-feed-status">{errorMessage}</p> : null}

                {!isLoading && !errorMessage && sortedPosts.length === 0 ? (
                    <p className="news-feed-status">No posts found yet.</p>
                ) : null}

                {sortedPosts.length > 0 ? (
                    <ul ref={newsFeedListRef} className="news-feed-list" aria-live="polite">
                        {sortedPosts.map((post) => {
                            const isValidPublishedDate = Boolean(post.publishedAt)

                            return (
                                <li key={post.key} className="news-post-item">
                                    <Card
                                        className="book news-post-card"
                                        isInteractive
                                        isHidden={post.key === hiddenPostKey}
                                        onActivate={(event, activationElement) =>
                                            handlePostClick(post, event, activationElement)
                                        }
                                        activationLabel={`Open blog post titled ${post.title}`}
                                    >
                                        <h3 className="title news-post-title">{post.title}</h3>

                                        <p className="book-year news-post-meta">
                                            <b>Publication Date:</b>{' '}
                                            {isValidPublishedDate ? (
                                                <time dateTime={post.publishedAt}>
                                                    {formatPublishedDate(post.publishedAt)}
                                                </time>
                                            ) : (
                                                'Date not set'
                                            )}
                                        </p>
                                    </Card>
                                </li>
                            )
                        })}
                    </ul>
                ) : null}
            </section>

            <div id="mc_embed_shell">
                <div id="mc_embed_signup">
                    <form
                        action="https://keryn-powell-author.us16.list-manage.com/subscribe/post?u=efd4d433b486f1a96d074cef8&amp;id=5ea16d2851&amp;f_id=00dec2e1f0"
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate"
                        target="_self"
                        noValidate
                    >
                        <div id="mc_embed_signup_scroll">
                            <h3>Newsletter Sign-Up</h3>

                            <div className="indicates-required">
                                <span className="asterisk">*</span> indicates required
                            </div>

                            <div className="mc-field-group">
                                <label htmlFor="mce-EMAIL">
                                    Email Address <span className="asterisk">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="EMAIL"
                                    className="required email"
                                    id="mce-EMAIL"
                                    required
                                    defaultValue=""
                                />
                            </div>

                            <div className="mc-field-group">
                                <label htmlFor="mce-FNAME">First Name </label>
                                <input
                                    type="text"
                                    name="FNAME"
                                    className="text"
                                    id="mce-FNAME"
                                    defaultValue=""
                                />
                                <span id="mce-FNAME-HELPERTEXT" className="helper_text">
                                    Optional
                                </span>
                            </div>

                            <div id="mce-responses" className="clear foot">
                                <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                                <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
                            </div>

                            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                                {/* Honeypot field for bot signups. */}
                                <input
                                    type="text"
                                    name="b_efd4d433b486f1a96d074cef8_5ea16d2851"
                                    tabIndex="-1"
                                    defaultValue=""
                                />
                            </div>

                            <div className="optionalParent">
                                <div className="clear foot">
                                    <input
                                        type="submit"
                                        name="subscribe"
                                        id="mc-embedded-subscribe"
                                        className="button"
                                        value="Subscribe"
                                    />

                                    <p style={{ margin: '0px auto' }}>
                                        <a
                                            href="https://eepurl.com/i6SKOw"
                                            title="Mailchimp - email marketing made easy and fun"
                                        >
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    backgroundColor: 'transparent',
                                                    borderRadius: '4px',
                                                }}
                                            >
                                                <img
                                                    className="referral_badge"
                                                    src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                                                    alt="Intuit Mailchimp"
                                                    style={{
                                                        width: '220px',
                                                        height: '40px',
                                                        display: 'flex',
                                                        padding: '2px 0px',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                />
                                            </span>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <NewsPostModal
                post={selectedPost}
                originRect={modalOriginRect}
                isClosing={isModalClosing}
                onClose={closePostModal}
            />
        </section>
    )
}

export default NewsPage