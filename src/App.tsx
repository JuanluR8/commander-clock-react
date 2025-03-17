import { useState } from 'react'
import { NUM_PLAYERS } from '@/constants'
import { PlayerClock, ActionsMenu } from '@/components'
import { GlobalContext, type GlobalState } from '@/contexts'
import './styles/App.css'

function App() {
  const [state, setState] = useState<GlobalState>({ 
    activePlayer: undefined, 
    numPlayers: NUM_PLAYERS, 
    timeLimit: 20 
  })

  const patchState = (payload: Partial<GlobalState>) => {
    setState(prevState => ({ ...prevState, ...payload }))
  }

  return (
    <GlobalContext.Provider value={{ state, patchState }}>
      <main className='main-container'>
        { 
          Array.from({ length: state.numPlayers }).map((_, playerIndex) => 
            <PlayerClock 
              key={playerIndex}
              playerId={playerIndex}
            />
          ) 
        }

        <ActionsMenu />
      </main>
    </GlobalContext.Provider>
  )
}

export default App
