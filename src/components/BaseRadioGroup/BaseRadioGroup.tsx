import './BaseRadioGroup.styles.css'

export interface BaseRadioGroupProps<T extends string | number> {
  className?: string
  options: T[]
  name: string
  value: T
  onChange: (value: T) => void
}

export const BaseRadioGroup = <T extends string | number>(
  props: BaseRadioGroupProps<T>
) => {
  const { className = '', options, name, value, onChange } = props

  return (
    <div className={`radio-group ${className}`.trim()}>
      {options.map(option => (
        <div key={option} className="radio--input">
          <input
            type="radio"
            id={`radio-${name}-${option}`}
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <label htmlFor={`radio-${name}-${option}`}>{option}</label>
        </div>
      ))}
    </div>
  )
}
