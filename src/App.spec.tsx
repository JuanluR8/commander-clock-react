import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { screen, cleanup, render } from '@testing-library/react';
import App, { TEST_ID } from './App'
import { TEST_ID as PlayerClockTestId } from './components/PlayerClock/PlayerClock'
import { TEST_ID as ActionMenuTestId } from './components/ActionsMenu/ActionsMenu';
import { NUM_PLAYERS } from './constants';

describe('<ActionsMenu />', () => {
  beforeEach(() =>  {
    vi.clearAllMocks()
  })

  afterEach(cleanup)
  
  it('should render App', () => {
    render(<App />)

    expect(screen.findByTestId(TEST_ID)).toBeDefined()
  })

  it('should render as many PlayerClock\'s as numPlayers', async () => {
    render(<App />)

    expect(await screen.findAllByTestId(PlayerClockTestId)).toHaveLength(NUM_PLAYERS)
  })

  it('should render ActionsMenu', () => {
    render(<App />)

    expect(screen.findByTestId(ActionMenuTestId)).toBeDefined()
  })
});