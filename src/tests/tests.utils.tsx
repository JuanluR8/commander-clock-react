import { type ReactElement } from 'react'
import { vi } from 'vitest'
import { render } from '@testing-library/react'
import { GlobalContext, type GlobalState } from '@/contexts/GlobalContext';

export interface RenderOptions {
  providerProps: { 
    state: Partial<GlobalState> 
  }
}

export const defaultState: GlobalState = {
  activePlayer: undefined,
  numPlayers: 4,
  timeLimit: 20
}
  
export const patchState = vi.fn()

export const renderWithGlobalContext = (ui: ReactElement, options?:  RenderOptions) => {
  const { state } = options?.providerProps ?? { providerProps: { state: {} } }

  return render(
    <GlobalContext.Provider value={{ state: { ...defaultState, ...state }, patchState }}>
      {ui}
    </GlobalContext.Provider>
  )
}