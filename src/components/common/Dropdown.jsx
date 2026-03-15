import './Dropdown.css'
import { useId, useMemo } from 'react'

function Dropdown({
    id,
    label,
    ariaLabel,
    value,
    onChange,
    options = [],
    className = '',
    disabled = false,
}) {
    if (
        typeof import.meta !== 'undefined' &&
        import.meta.env &&
        import.meta.env.DEV &&
        !label &&
        !ariaLabel
    ) {
        // Ensure Dropdown is always given an accessible name
        // via either a visible label or an aria-label.
        // eslint-disable-next-line no-console
        console.error(
            'Dropdown: Accessible name is missing. Please provide either a `label` or `ariaLabel` prop.'
        )
    }

    function handleChange(event) {
        if (typeof onChange === 'function') {
            onChange(event.target.value, event)
        }
    }

    const dropdownClassName = ['dropdown', className].filter(Boolean).join(' ')
    const generatedId = useId()
    const normalizedId =
        typeof id === 'string'
            ? id.trim() === ''
                ? undefined
                : id.trim()
            : undefined
    const selectId = normalizedId ?? generatedId

    const normalizedOptions = useMemo(() => {
        const seenValues = new Set()
        const uniqueOptions = []

        for (const option of options) {
            const optionValue = option?.value
            if (typeof optionValue !== 'string') {
                continue
            }
            if (seenValues.has(optionValue)) {
                continue
            }
            seenValues.add(optionValue)
            uniqueOptions.push(option)
        }

        return uniqueOptions
    }, [options])

    return (
        <div className={dropdownClassName}>
            {label ? (
                <label className="dropdown-label" htmlFor={selectId}>
                    {label}
                </label>
            ) : null}

            <div className="dropdown-select-wrapper">
                <select
                    id={selectId}
                    className="dropdown-select"
                    aria-label={ariaLabel || label || undefined}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                >
                    {normalizedOptions.map((option) => {
                        const optionValue = option.value
                        const optionLabel =
                            typeof option?.label === 'string'
                                ? option.label
                                : optionValue

                        return (
                            <option key={optionValue} value={optionValue}>
                                {optionLabel}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default Dropdown