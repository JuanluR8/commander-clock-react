import { useState } from 'react'
import { NUM_PLAYERS } from '@/constants'
import { BaseBtn, MenuIcon, PlayerClock, SettingsDialog } from '@/components'
import { GlobalContext, type GlobalState } from '@/contexts'
import './styles/App.css'

function App() {
  const [state, setState] = useState<GlobalState>({
    activePlayer: undefined,
    numPlayers: NUM_PLAYERS,
    timeLimit: 20,
  })
  const [dialogOpen, setDialogOpen] = useState(false)

  const patchState = (payload: Partial<GlobalState>) => {
    setState(prevState => ({ ...prevState, ...payload }))
  }

  const openSettings = () => {
    patchState({ activePlayer: undefined })
    setDialogOpen(true)
  }

  return (
    <GlobalContext.Provider value={{ state, patchState }}>
      <main
        className={`main-container num-players-${state.numPlayers}`}
        data-testid="main-container"
      >
        {dialogOpen && (
          <SettingsDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        )}

        {Array.from({ length: state.numPlayers }).map((_, playerIndex) => (
          <PlayerClock key={playerIndex} playerId={playerIndex} />
        ))}

        <div className="center-actions" data-testid="center-actions">
          <BaseBtn
            className="menu--btn"
            aria-label="Open settings"
            onClick={openSettings}
          >
            <MenuIcon />
          </BaseBtn>
        </div>
      </main>
    </GlobalContext.Provider>
  )
}

export default App
