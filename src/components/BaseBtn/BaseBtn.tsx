import { type ButtonHTMLAttributes } from 'react'
import './BaseBtn.styles.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean
}

export const BaseBtn = (props: Props) => {
  const { className, children, rounded = false, ...rest } = props

  return (
    <button
      className={`base-btn ${className} ${rounded ? 'rounded' : ''}`}
      {...rest}
    >
      {children}
    </button>
  )
}
