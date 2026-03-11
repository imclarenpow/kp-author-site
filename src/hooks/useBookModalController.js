import { useMemo } from 'react'
import { getBookKey } from '../utils/bookUtils'
import useCardModalController from './useCardModalController'

function useBookModalController({
    closeAnimationMs,
    cardRevealDelayMs,
} = {}) {
    const options = useMemo(
        () => ({
            getItemKey: getBookKey,
            closeAnimationMs,
            cardRevealDelayMs,
        }),
        [cardRevealDelayMs, closeAnimationMs],
    )
    const {
        selectedItem,
        hiddenItemKey,
        modalOriginRect,
        isModalClosing,
        openItemModal,
        closeItemModal,
    } = useCardModalController(options)

    return {
        selectedBook: selectedItem,
        hiddenBookKey: hiddenItemKey,
        modalOriginRect,
        isModalClosing,
        openBookModal: openItemModal,
        closeBookModal: closeItemModal,
    }
}

export default useBookModalController
