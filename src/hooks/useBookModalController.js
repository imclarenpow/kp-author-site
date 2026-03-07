import { useCallback, useEffect, useRef, useState } from 'react'
import { getBookKey, getElementRect } from '../utils/bookUtils'

const DEFAULT_CLOSE_ANIMATION_MS = 280
const DEFAULT_CARD_REVEAL_DELAY_MS = 120

function clearTimeoutRef(timeoutRef) {
    if (!timeoutRef.current) {
        return
    }

    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = null
}

function restoreFocusAfterClose(element) {
    if (!element || !document.contains(element)) {
        return
    }

    window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
            element.focus()
        })
    })
}

function useBookModalController({
    closeAnimationMs = DEFAULT_CLOSE_ANIMATION_MS,
    cardRevealDelayMs = DEFAULT_CARD_REVEAL_DELAY_MS,
} = {}) {
    const [selectedBook, setSelectedBook] = useState(null)
    const [hiddenBookKey, setHiddenBookKey] = useState(null)
    const [modalOriginRect, setModalOriginRect] = useState(null)
    const [isModalClosing, setIsModalClosing] = useState(false)

    const closeTimeoutRef = useRef(null)
    const revealTimeoutRef = useRef(null)
    const modalTriggerRef = useRef(null)

    const clearPendingTimeouts = useCallback(() => {
        clearTimeoutRef(closeTimeoutRef)
        clearTimeoutRef(revealTimeoutRef)
    }, [])

    const openBookModal = useCallback(
        (book, sourceElement) => {
            clearPendingTimeouts()

            modalTriggerRef.current = sourceElement ?? null

            setHiddenBookKey(getBookKey(book))
            setModalOriginRect(getElementRect(sourceElement))
            setIsModalClosing(false)
            setSelectedBook(book)
        },
        [clearPendingTimeouts],
    )

    const closeBookModal = useCallback(() => {
        if (!selectedBook || isModalClosing) {
            return
        }

        setIsModalClosing(true)

        revealTimeoutRef.current = window.setTimeout(() => {
            setHiddenBookKey(null)
            revealTimeoutRef.current = null
        }, cardRevealDelayMs)

        closeTimeoutRef.current = window.setTimeout(() => {
            const triggerElement = modalTriggerRef.current

            setSelectedBook(null)
            setHiddenBookKey(null)
            setModalOriginRect(null)
            setIsModalClosing(false)

            restoreFocusAfterClose(triggerElement)
            modalTriggerRef.current = null

            clearTimeoutRef(closeTimeoutRef)
            clearTimeoutRef(revealTimeoutRef)
        }, closeAnimationMs)
    }, [cardRevealDelayMs, closeAnimationMs, isModalClosing, selectedBook])

    useEffect(() => {
        return () => {
            clearPendingTimeouts()
        }
    }, [clearPendingTimeouts])

    return {
        selectedBook,
        hiddenBookKey,
        modalOriginRect,
        isModalClosing,
        openBookModal,
        closeBookModal,
    }
}

export default useBookModalController
