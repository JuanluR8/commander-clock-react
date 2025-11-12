import { PlayerClock, NoSleep, AppSettings } from '@/components'
import { GlobalContext } from '@/contexts'
import { useSettings } from '@/hooks'
import './styles/App.css'

function App() {
  const { state, updateState } = useSettings()

  return (
    <NoSleep>
      <GlobalContext.Provider value={{ state, updateState }}>
        <main
          className={`main-container num-players-${state.numPlayers}`}
          data-testid="main-container"
        >
          {Array.from({ length: state.numPlayers }).map((_, index) => (
            <PlayerClock
              key={index}
              playerId={index}
              data-testid="player-clock"
            />
          ))}

          <AppSettings className="center-actions" data-test="center-actions" />
        </main>
      </GlobalContext.Provider>
    </NoSleep>
  )
}

export default App
