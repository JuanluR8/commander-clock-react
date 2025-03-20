import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { screen, cleanup, fireEvent } from '@testing-library/react';
import { ActionsMenu, TEST_ID, MIN_LIMIT, MAX_LIMIT } from './ActionsMenu'
import { renderWithGlobalContext, defaultState as state, patchState } from '@/tests/tests.utils';

const getBtn = (name: RegExp | string) => screen.getByRole('button', { name })

describe('<ActionsMenu />', () => {
  beforeEach(() =>  {
    vi.clearAllMocks()
  })

  afterEach(cleanup)
  
  it('should render component', () => {
    renderWithGlobalContext(<ActionsMenu />)

    expect(screen.findByTestId(TEST_ID)).toBeDefined()
  })

  it('increase and decrease buttons should be disabled when there is an activePlayer', () => {
    renderWithGlobalContext(<ActionsMenu />, { providerProps: { state: { activePlayer: 0 } } })

    expect(getBtn(/Decrease/i)).toHaveProperty('disabled')
    expect(getBtn(/Increase/i)).toHaveProperty('disabled')
  })

  it('decrease button should be disabled when timeLimit is gte MIN_LIMIT', () => {
    renderWithGlobalContext(<ActionsMenu />, { providerProps: { state: { timeLimit: MIN_LIMIT } } })

    expect(getBtn(/Decrease/i)).toHaveProperty('disabled')
  })

  it('should execute context method on click Decrease button', () => {
    renderWithGlobalContext(<ActionsMenu />)
  
    fireEvent.click(getBtn(/Decrease/i))

    expect(patchState).toHaveBeenCalledWith({ timeLimit: state.timeLimit - 1 })
  })

  it('increase button should be disabled when timeLimit is gte MAX_LIMIT', () => {
    renderWithGlobalContext(<ActionsMenu />, { providerProps: { state: { timeLimit: MAX_LIMIT } } })

    expect(getBtn(/Increase/i)).toHaveProperty('disabled')
  })

  it('should execute context method on click Increase button', () => {
    renderWithGlobalContext(<ActionsMenu />)

    fireEvent.click(getBtn(/Increase/i))
  
    expect(patchState).toHaveBeenCalledWith({ timeLimit: state.timeLimit + 1 })
  })
  
  it('should execute context method on click Reset button', () => {
    renderWithGlobalContext(<ActionsMenu />)

    fireEvent.click(getBtn(/Reset/i))
  
    expect(patchState).toHaveBeenCalled()
  })
});