import { type ButtonHTMLAttributes } from 'react'
import './BaseBtn.styles.css'

export type BaseBtnProps = ButtonHTMLAttributes<HTMLButtonElement>

export const BaseBtn = (props: BaseBtnProps) => {
  const { className, children, ...rest } = props

  return (
    <button className={`base-btn ${className}`} {...rest}>
      {children}
    </button>
  )
}
