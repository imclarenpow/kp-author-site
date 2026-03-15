import './Dropdown.css'
import { useId } from 'react'

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
    function handleChange(event) {
        if (typeof onChange === 'function') {
            onChange(event.target.value, event)
        }
    }

    const dropdownClassName = ['dropdown', className].filter(Boolean).join(' ')
    const generatedId = useId()
    const selectId = id ?? generatedId

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
                    {options
                        .filter((option, index, allOptions) => {
                            if (
                                typeof option?.value !== 'string' ||
                                option.value === ''
                            ) {
                                return false
                            }

                            // Ensure uniqueness by value: keep only the first occurrence
                            return (
                                allOptions.findIndex(
                                    (other) => other?.value === option.value
                                ) === index
                            )
                        })
                        .map((option) => {
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