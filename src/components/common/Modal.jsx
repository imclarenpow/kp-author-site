import { useEffect, useLayoutEffect, useRef } from 'react'
import './Modal.css'

const MIN_SCALE_FACTOR = 0.2
const MAX_OPEN_SCALE_FACTOR = 0.88
const FOCUSABLE_SELECTOR =
    'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function getFocusableElements(container) {
    if (!container) {
        return []
    }

    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (element) => element.getClientRects().length > 0,
    )
}

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

function capOpenScale(transform) {
    return {
        ...transform,
        scaleX: Math.min(MAX_OPEN_SCALE_FACTOR, transform.scaleX),
        scaleY: Math.min(MAX_OPEN_SCALE_FACTOR, transform.scaleY),
    }
}

function Modal({
    isOpen,
    onClose,
    labelledBy,
    closeLabel = 'Close',
    children,
    modalRef,
    initialFocusRef,
    originRect = null,
    isClosing = false,
    backdropClassName = 'book-modal-backdrop',
    closingBackdropClassName = 'book-modal-backdrop-closing',
    modalClassName = 'book-modal',
}) {
    const internalModalRef = useRef(null)
    const resolvedModalRef = modalRef || internalModalRef

    useLayoutEffect(() => {
        if (!isOpen) {
            return undefined
        }

        const modalElement = resolvedModalRef.current

        if (!modalElement) {
            return undefined
        }

        if (!originRect) {
            modalElement.style.transform = 'translate(0px, 0px) scale(1, 1)'
            modalElement.style.opacity = '1'
            return undefined
        }

        const modalRect = modalElement.getBoundingClientRect()
        const closingTransform = getOriginTransform(originRect, modalRect)
        const openingTransform = capOpenScale(closingTransform)

        if (isClosing) {
            const collapsedTransform = `translate(${closingTransform.x}px, ${closingTransform.y}px) scale(${closingTransform.scaleX}, ${closingTransform.scaleY})`
            modalElement.style.transform = collapsedTransform
            modalElement.style.opacity = '0.35'
            return undefined
        }

        const collapsedTransform = `translate(${openingTransform.x}px, ${openingTransform.y}px) scale(${openingTransform.scaleX}, ${openingTransform.scaleY})`

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
    }, [isClosing, isOpen, originRect, resolvedModalRef])

    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        const modalElement = resolvedModalRef.current

        if (!modalElement) {
            return undefined
        }

        const focusFrame = window.requestAnimationFrame(() => {
            if (initialFocusRef?.current) {
                initialFocusRef.current.focus()
                return
            }

            const focusableElements = getFocusableElements(modalElement)

            if (focusableElements.length > 0) {
                focusableElements[0].focus()
                return
            }

            modalElement.focus()
        })

        function handleEscapeAndTab(event) {
            if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                onClose()
                return
            }

            if (event.key !== 'Tab') {
                return
            }

            const focusableElements = getFocusableElements(modalElement)

            if (focusableElements.length === 0) {
                event.preventDefault()
                modalElement.focus()
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]
            const activeElement = document.activeElement
            const isActiveInsideModal = modalElement.contains(activeElement)

            if (event.shiftKey) {
                if (!isActiveInsideModal || activeElement === firstElement) {
                    event.preventDefault()
                    lastElement.focus()
                }

                return
            }

            if (!isActiveInsideModal || activeElement === lastElement) {
                event.preventDefault()
                firstElement.focus()
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        document.addEventListener('keydown', handleEscapeAndTab, true)

        return () => {
            window.cancelAnimationFrame(focusFrame)
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', handleEscapeAndTab, true)
        }
    }, [initialFocusRef, isOpen, onClose, resolvedModalRef])

    if (!isOpen) {
        return null
    }

    const backdropClass = `${backdropClassName}${isClosing ? ` ${closingBackdropClassName}` : ''}`

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div className={backdropClass} onClick={handleBackdropClick} role="presentation">
            <div
                ref={resolvedModalRef}
                className={modalClassName}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                tabIndex={-1}
            >
                <button
                    type="button"
                    className="book-modal-close"
                    onClick={onClose}
                    aria-label={closeLabel}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
