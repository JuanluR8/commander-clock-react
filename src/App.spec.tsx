import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import App from './App'

vi.mock('@/hooks', () => ({
  useSettings: () => ({
    state: { numPlayers: 4 },
    updateState: vi.fn(),
  }),
}))

describe('<App />', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render mainContainer based on numPlayers', () => {
    const wrapper = render(<App />)

    expect(wrapper.getByTestId('main-container').className).toContain(
      `num-players-4`
    )
  })

  it("should render as many PlayerClock's as numPlayers", () => {
    const wrapper = render(<App />)

    expect(wrapper.getAllByTestId('player-clock')).toHaveLength(4)
  })

  it('should render Settings menu', () => {
    const wrapper = render(<App />)

    expect(wrapper.getByRole('button', { name: /settings/i })).toBeDefined()
  })
})
