import { type ReactElement } from 'react'
import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { GlobalContext, type GlobalState } from '@/contexts/GlobalContext'

export interface RenderOptions {
  state: Partial<GlobalState>
}

export const defaultState: GlobalState = {
  activePlayer: undefined,
  numPlayers: 4,
  timeLimit: 20,
}

export const updateState = vi.fn()

export const renderWithGlobalContext = (
  children: ReactElement,
  options: RenderOptions = { state: {} }
) => {
  const state: GlobalState = { ...defaultState, ...options.state }

  return render(
    <GlobalContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalContext.Provider>
  )
}
