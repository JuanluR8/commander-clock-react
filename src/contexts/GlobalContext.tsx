import { createContext, type Dispatch, useContext } from 'react'

export interface GlobalState {
  activePlayer: number | undefined
  numPlayers: number
  timeLimit: number
}

interface GlobalCtx {
  state: GlobalState,
  patchState: Dispatch<Partial<GlobalState>>,
}

export const GlobalContext = createContext<GlobalCtx | undefined>(undefined)

export const useGlobalContext = () => {
  const ctx = useContext(GlobalContext)

  if (ctx === undefined) {
    throw new Error('useGlobalContext must be used within GlobalContext.Provider')
  }

  return ctx
}
