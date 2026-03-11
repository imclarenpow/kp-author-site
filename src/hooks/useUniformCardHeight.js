import { useLayoutEffect, useRef } from 'react'

function useUniformCardHeight({
    cardSelector = '[data-uniform-card]',
    cssVarName = '--uniform-card-height',
    items = [],
    enabled = true,
} = {}) {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const container = containerRef.current

        if (!container || !enabled) {
            if (container) {
                container.style.removeProperty(cssVarName)
            }

            return undefined
        }

        let frameId = 0

        function getCards() {
            return Array.from(container.querySelectorAll(cardSelector))
        }

        function measureAndApplyHeight() {
            const cards = getCards()

            if (!cards.length) {
                container.style.removeProperty(cssVarName)
                return
            }

            // Remove the fixed height first so we can re-measure natural content height.
            container.style.removeProperty(cssVarName)

            const maxHeight = cards.reduce((currentMax, cardElement) => {
                return Math.max(currentMax, cardElement.getBoundingClientRect().height)
            }, 0)

            container.style.setProperty(cssVarName, `${Math.ceil(maxHeight)}px`)
        }

        function scheduleMeasure() {
            cancelAnimationFrame(frameId)
            frameId = requestAnimationFrame(measureAndApplyHeight)
        }

        scheduleMeasure()

        const resizeObserver =
            typeof ResizeObserver === 'function' ? new ResizeObserver(scheduleMeasure) : null

        if (resizeObserver) {
            resizeObserver.observe(container)
            getCards().forEach((cardElement) => {
                resizeObserver.observe(cardElement)
            })
        }

        window.addEventListener('resize', scheduleMeasure)

        return () => {
            cancelAnimationFrame(frameId)
            window.removeEventListener('resize', scheduleMeasure)

            if (resizeObserver) {
                resizeObserver.disconnect()
            }
        }
    }, [cardSelector, cssVarName, enabled, items])

    return containerRef
}

export default useUniformCardHeight
