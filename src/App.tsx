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

  const onClickPlayerTimer = (playerId: GlobalState['activePlayer']) => {
    patchState({ activePlayer: state.activePlayer === playerId 
      ? undefined 
      : playerId
    })
  }

  return (
    <GlobalContext.Provider value={state}>
      <main className='main-container'>
        { 
          Array.from({ length: state.numPlayers }).map((_, playerIndex) => 
            <PlayerClock 
              key={playerIndex}
              playerId={playerIndex}
              onClick={() => onClickPlayerTimer(playerIndex)}
            />
          ) 
        }

        <ActionsMenu state={state} patchState={patchState} />
      </main>
    </GlobalContext.Provider>
  )
}

export default App
