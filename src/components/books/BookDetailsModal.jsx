import { useEffect, useLayoutEffect, useRef } from 'react'
import './BookCover.css'
import './BookDetailsModal.css'

const MIN_SCALE_FACTOR = 0.2

function getOriginTransform(originRect, modalRect) {
    const originCenterX = originRect.left + originRect.width / 2
    const originCenterY = originRect.top + originRect.height / 2
    const modalCenterX = modalRect.left + modalRect.width / 2
    const modalCenterY = modalRect.top + modalRect.height / 2

    return {
        x: originCenterX - modalCenterX,
        y: originCenterY - modalCenterY,
        scaleX: Math.max(MIN_SCALE_FACTOR, originRect.width / modalRect.width),
        scaleY: Math.max(MIN_SCALE_FACTOR, originRect.height / modalRect.height),
    }
}

function BookDetailsModal({ book, originRect, isClosing, onClose }) {
    const modalRef = useRef(null)

    useLayoutEffect(() => {
        if (!book || !modalRef.current) {
            return
        }

        const modalElement = modalRef.current

        if (!originRect) {
            modalElement.style.transform = 'translate(0px, 0px) scale(1, 1)'
            modalElement.style.opacity = '1'
            return
        }

        const modalRect = modalElement.getBoundingClientRect()
        const { x, y, scaleX, scaleY } = getOriginTransform(originRect, modalRect)
        const collapsedTransform = `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`

        if (isClosing) {
            modalElement.style.transform = collapsedTransform
            modalElement.style.opacity = '0.35'
            return
        }

        modalElement.style.transition = 'none'
        modalElement.style.transform = collapsedTransform
        modalElement.style.opacity = '0.35'
        const frame = window.requestAnimationFrame(() => {
            modalElement.style.transition = ''
            modalElement.style.transform = 'translate(0px, 0px) scale(1, 1)'
            modalElement.style.opacity = '1'
        })

        return () => {
            window.cancelAnimationFrame(frame)
        }
    }, [book, originRect, isClosing])

    useEffect(() => {
        if (!book) {
            return undefined
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        window.addEventListener('keydown', handleEscape)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleEscape)
        }
    }, [book, onClose])

    if (!book) {
        return null
    }
    const backdropClassName = `book-modal-backdrop${isClosing ? ' book-modal-backdrop-closing' : ''}`

    const coverSrc = `/assets/img/covers/${book.cover}`
    const hasPrimaryLink = Boolean(book.link1 && book.link1name)
    const hasSecondaryLink = Boolean(book.link2 && book.link2name)
    const hasBlurb = Boolean(book.blurb)

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div className={backdropClassName} onClick={handleBackdropClick} role="presentation">
            <div
                ref={modalRef}
                className="book-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="book-modal-title"
            >
                <div className="book-modal-content">
                    <button
                        type="button"
                        className="book-modal-close"
                        onClick={onClose}
                        aria-label="Close book details"
                    >
                        X
                    </button>

                    <img src={coverSrc} alt={`${book.title} Cover`} className="book-modal-cover" />

                    <div className="book-modal-details">
                        <h2 id="book-modal-title" className="book-modal-title">
                            {book.title}
                        </h2>
                        <h3 className="book-modal-subtitle">{book.subtitle}</h3>

                        <p className="book-modal-meta">
                            <b>Series:</b> {book.series}
                        </p>

                        <p className="book-modal-meta">
                            <b>Publication Date:</b> {book.year}
                        </p>

                        {hasBlurb ? (
                            <p
                                className="book-modal-blurb"
                                dangerouslySetInnerHTML={{ __html: book.blurb }}
                            ></p>
                        ) : null}

                        {hasPrimaryLink || hasSecondaryLink ? (
                            <div className="book-modal-links">
                                {hasPrimaryLink ? (
                                    <a
                                        href={book.link1}
                                        className="book-modal-link book-modal-link-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {book.link1name}
                                    </a>
                                ) : null}

                                {hasSecondaryLink ? (
                                    <a
                                        href={book.link2}
                                        className="book-modal-link book-modal-link-secondary"
                                    >
                                        {book.link2name}
                                    </a>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailsModal