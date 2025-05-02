import { describe, it, expect, afterEach } from 'vitest'
import {
  screen,
  cleanup,
  render,
} from '@testing-library/react'
import { BaseBtn, type Props } from './BaseBtn'


const renderWithProps = (props?: Props) => {
  return render(<BaseBtn {...props} />)
}

describe('<BaseBtn />', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render component', () => {
    renderWithProps()

    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('should render custom slot', () => {
    renderWithProps({ children: 'My custom label' })

    expect(screen.getByRole('button').textContent).toBe('My custom label')
  })

  it('should render btn with custom className', () => {
    renderWithProps({ children: 'My custom label', className: 'my-class' })

    expect(screen.getByRole('button').classList).toContain('my-class')
  })

  it('should be rounded when prop is passed', () => {
    renderWithProps({ children: 'My custom label', rounded: true })

    expect(screen.getByRole('button').classList).toContain('rounded')
  })
})
