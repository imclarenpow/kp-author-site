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
    const selectId = id ?? useId()

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
                    {options.map((option) => {
                        const optionValue = typeof option?.value === 'string' ? option.value : ''
                        const optionLabel = typeof option?.label === 'string' ? option.label : optionValue

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