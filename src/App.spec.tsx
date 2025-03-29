import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { screen, cleanup, render } from '@testing-library/react'
import App from './App'
import { PLAYER_CLOCK_TEST_ID as PlayerClockTestId } from './components/PlayerClock/PlayerClock'
import { NUM_PLAYERS } from './constants'

describe('<App />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(cleanup)

  it('should render App', () => {
    render(<App />)

    expect(screen.findByTestId('main-container')).toBeDefined()
  })

  it("should render as many PlayerClock's as numPlayers", async () => {
    render(<App />)

    expect(await screen.findAllByTestId(PlayerClockTestId)).toHaveLength(
      NUM_PLAYERS
    )
  })

  it('should render Settings menu', () => {
    render(<App />)

    expect(screen.findByRole('button', { name: /settings/i })).toBeDefined()
  })
})
