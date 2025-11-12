import { useLocalStorage } from '@uidotdev/usehooks'
import type { GlobalState } from '@/contexts'
import { NUM_PLAYERS } from '@/constants'
import { useEffect } from 'react'

export const useSettings = () => {
  const [state, setState] = useLocalStorage<GlobalState>('settings', {
    activePlayer: undefined,
    numPlayers: NUM_PLAYERS,
    timeLimit: 20,
  })

  const updateState = (payload: Partial<GlobalState>) => {
    setState(prevState => ({ ...prevState, ...payload }))
  }

  useEffect(() => {
    return () => {
      setState(prevState => ({ ...prevState, activePlayer: undefined }))
    }
  }, [])

  return {
    state,
    updateState,
  }
}
