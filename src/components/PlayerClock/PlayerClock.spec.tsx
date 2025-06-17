import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import {
  screen,
  cleanup,
  fireEvent,
  waitFor,
  render,
} from '@testing-library/react'
import { PlayerClock, PLAYER_CLOCK_TEST_ID, type PlayerClockProps } from './PlayerClock'
import {
  renderWithGlobalContext,
  defaultState,
  patchState,
  type RenderOptions,
} from '@/tests/tests.utils'

const firstPlayer = 0
const lastPlayer = defaultState.numPlayers - 1

const renderWithProps = ({ playerId }: PlayerClockProps, options?: RenderOptions) => {
  return renderWithGlobalContext(<PlayerClock playerId={playerId} />, options)
}

describe('<PlayerClock />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it('should render component', () => {
    renderWithProps({ playerId: firstPlayer })

    expect(screen.findByTestId(PLAYER_CLOCK_TEST_ID)).toBeDefined()
  })

  it('should have flip class if playerId is in the up side', () => {
    const FirstPlayer = renderWithProps({ playerId: firstPlayer })

    expect(FirstPlayer.getByTestId(PLAYER_CLOCK_TEST_ID).className).contain(
      'flip'
    )

    FirstPlayer.unmount()

    const LastPlayer = renderWithProps({ playerId: lastPlayer })

    expect(LastPlayer.getByTestId(PLAYER_CLOCK_TEST_ID).className).not.contain(
      'flip'
    )
  })

  it('should have active class if player is active', () => {
    const ActivePlayer = renderWithProps(
      { playerId: firstPlayer },
      { providerProps: { state: { activePlayer: firstPlayer } } }
    )

    expect(ActivePlayer.getByTestId(PLAYER_CLOCK_TEST_ID).className).contain(
      'active'
    )

    ActivePlayer.unmount()

    const InactivePlayer = renderWithProps(
      { playerId: lastPlayer },
      { providerProps: { state: { activePlayer: firstPlayer } } }
    )

    expect(
      InactivePlayer.getByTestId(PLAYER_CLOCK_TEST_ID).className
    ).not.contain('active')
  })

  it('should display remaining time', () => {
    renderWithProps({ playerId: firstPlayer })

    expect(screen.getByTestId(PLAYER_CLOCK_TEST_ID).innerHTML).toMatch(
      /\d{2}:\d{2}/
    )
  })

  it('should set activePlayer onClick article', () => {
    renderWithProps({ playerId: firstPlayer })

    fireEvent.click(screen.getByTestId(PLAYER_CLOCK_TEST_ID))

    expect(patchState).toHaveBeenCalledWith({ activePlayer: firstPlayer })
  })

  it('should set activePlayer to undefined onClick article if player was active', () => {
    renderWithProps(
      { playerId: firstPlayer },
      { providerProps: { state: { activePlayer: firstPlayer } } }
    )

    fireEvent.click(screen.getByTestId(PLAYER_CLOCK_TEST_ID))

    expect(patchState).toHaveBeenCalledWith({ activePlayer: undefined })
  })

  it('should decrease displayer time while player is active', async () => {
    renderWithProps(
      { playerId: firstPlayer },
      { providerProps: { state: { activePlayer: firstPlayer, timeLimit: 20 } } }
    )

    expect(screen.getByTestId(PLAYER_CLOCK_TEST_ID).innerHTML).toMatch('20:00')

    waitFor(
      () => {
        expect(screen.getByTestId(PLAYER_CLOCK_TEST_ID).innerHTML).toMatch(
          '19:55'
        )
      },
      { timeout: 5000 }
    )
  })

  it('should throw error if component is rendered without GlobalContext provider', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => render(<PlayerClock playerId={0} />)).toThrow()

    consoleErrorSpy.mockRestore()
  })
})
