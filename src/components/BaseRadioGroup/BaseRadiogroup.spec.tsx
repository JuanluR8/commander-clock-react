import { describe, it, expect, afterEach, vi } from 'vitest'
import {
  screen,
  cleanup,
  render,
  fireEvent
} from '@testing-library/react'
import { BaseRadioGroup, type BaseRadioGroupProps } from './BaseRadioGroup'

type TestOption = string

const testOptions: TestOption[] = ['foo', 'bar', 'baz']

const defaultProps: BaseRadioGroupProps<TestOption> = {
  name: 'test', 
  options: testOptions, 
  value: '', 
  onChange: vi.fn()
}

const renderWithProps = (props?: Partial<BaseRadioGroupProps<TestOption>>) => {
  const renderProps = {
    ...defaultProps,
    ...props
  }

  return render(<BaseRadioGroup {...renderProps} />)
}


describe('<BaseRadioGroup />', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render as many options as passed', () => {
    renderWithProps()

    expect(screen.getAllByRole('radio')).toHaveLength(testOptions.length)
  })

  it('should execute onChange when selection a radio', () => {
    const value = testOptions[0]
    const onChangeFn = vi.fn()

    renderWithProps({ onChange: onChangeFn })

    const radioEl = screen.getByRole('radio', { name: value })

    fireEvent.click(radioEl)
    
    expect(onChangeFn).toHaveBeenCalledWith(value)
  })

  it('selected value radio should be checked', () => {
    const value = testOptions[0]

    renderWithProps({ value })

    const radioEl = screen.getByRole('radio', { name: value })

    expect(radioEl).toHaveProperty('checked', true)
  })
})
