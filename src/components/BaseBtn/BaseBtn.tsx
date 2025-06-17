import { type ButtonHTMLAttributes } from 'react'
import './BaseBtn.styles.css'

export interface BaseBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean
}

export const BaseBtn = (props: BaseBtnProps) => {
  const { className = '', children, rounded = false, ...rest } = props

  return (
    <button
      className={`base-btn ${className} ${rounded ? 'rounded' : ''}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}
