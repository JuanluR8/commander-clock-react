import { useGlobalContext } from "@/contexts"
import { MinusIcon, PlusIcon, ReloadIcon } from "../Icons"
import './ActionsMenu.style.css'

export const MIN_LIMIT = 5
export const MAX_LIMIT = 60
export const TEST_ID = 'actions-menu'

export const ActionsMenu = () => {

  const { state, patchState } = useGlobalContext()

  const updateTimeLimit = (value: number) => {
    if (value <= MIN_LIMIT || value >= MAX_LIMIT || state.activePlayer !== undefined) return

    patchState({ timeLimit: value })
  }

  const resetGame = () => {
    const oldLimit = state.timeLimit
    
    patchState({ activePlayer: undefined, timeLimit: 0 })

    setTimeout(() => {
      updateTimeLimit(oldLimit)
    }, 500)
  }

  return (
    <div className='actions-menu' data-testid={TEST_ID}>
      <button
        className="actions-menu--btn round-circle" 
        aria-label="Decrease time limit"
        disabled={state.timeLimit <= MIN_LIMIT || !!state.activePlayer} 
        onClick={() => updateTimeLimit(state.timeLimit - 1)}
      >
        <MinusIcon />
      </button>
      <button 
        className="actions-menu--btn" 
        aria-label="Reset"
        onClick={resetGame}
      >
        <ReloadIcon />
      </button>
      <button 
        className="actions-menu--btn round-circle"
        aria-label="Increase time limit"
        disabled={state.timeLimit >= MAX_LIMIT || !!state.activePlayer} 
        onClick={() => updateTimeLimit(state.timeLimit + 1)}
      >
        <PlusIcon />
      </button>
    </div> 
  )
}