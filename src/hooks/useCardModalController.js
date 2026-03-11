import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_CLOSE_ANIMATION_MS = 280
const DEFAULT_CARD_REVEAL_DELAY_MS = 120

function clearTimeoutRef(timeoutRef) {
    if (!timeoutRef.current) {
        return
    }

    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = null
}

function getElementRect(element) {
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

function useCardModalController({
    getItemKey,
    closeAnimationMs = DEFAULT_CLOSE_ANIMATION_MS,
    cardRevealDelayMs = DEFAULT_CARD_REVEAL_DELAY_MS,
} = {}) {
    const [selectedItem, setSelectedItem] = useState(null)
    const [hiddenItemKey, setHiddenItemKey] = useState(null)
    const [modalOriginRect, setModalOriginRect] = useState(null)
    const [isModalClosing, setIsModalClosing] = useState(false)

    const closeTimeoutRef = useRef(null)
    const revealTimeoutRef = useRef(null)
    const modalTriggerRef = useRef(null)

    const clearPendingTimeouts = useCallback(() => {
        clearTimeoutRef(closeTimeoutRef)
        clearTimeoutRef(revealTimeoutRef)
    }, [])

    const openItemModal = useCallback(
        (item, sourceElement) => {
            if (typeof getItemKey !== 'function') {
                return
            }

            clearPendingTimeouts()

            modalTriggerRef.current = sourceElement ?? null

            setHiddenItemKey(getItemKey(item))
            setModalOriginRect(getElementRect(sourceElement))
            setIsModalClosing(false)
            setSelectedItem(item)
        },
        [clearPendingTimeouts, getItemKey],
    )

    const closeItemModal = useCallback(() => {
        if (!selectedItem || isModalClosing) {
            return
        }

        setIsModalClosing(true)

        revealTimeoutRef.current = window.setTimeout(() => {
            setHiddenItemKey(null)
            revealTimeoutRef.current = null
        }, cardRevealDelayMs)

        closeTimeoutRef.current = window.setTimeout(() => {
            const triggerElement = modalTriggerRef.current

            setSelectedItem(null)
            setHiddenItemKey(null)
            setModalOriginRect(null)
            setIsModalClosing(false)

            restoreFocusAfterClose(triggerElement)
            modalTriggerRef.current = null

            clearTimeoutRef(closeTimeoutRef)
            clearTimeoutRef(revealTimeoutRef)
        }, closeAnimationMs)
    }, [cardRevealDelayMs, closeAnimationMs, isModalClosing, selectedItem])

    useEffect(() => {
        return () => {
            clearPendingTimeouts()
        }
    }, [clearPendingTimeouts])

    return {
        selectedItem,
        hiddenItemKey,
        modalOriginRect,
        isModalClosing,
        openItemModal,
        closeItemModal,
    }
}

export default useCardModalController
