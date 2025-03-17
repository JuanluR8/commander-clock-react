import { createContext, useContext } from 'react'

export interface GlobalState {
  activePlayer: number | undefined
  numPlayers: number
  timeLimit: number
}

export const GlobalContext = createContext<GlobalState | undefined>(undefined)

export const useGlobalContext = () => {
  const state = useContext(GlobalContext)

  if (state === undefined) {
    throw new Error('useGlobalContext must be used within GlobalContext.Provider')
  }

  return state
}
