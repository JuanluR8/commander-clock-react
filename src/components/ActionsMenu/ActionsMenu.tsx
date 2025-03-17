import { useGlobalContext } from "@/contexts"
import { MinusIcon, PlusIcon, ReloadIcon } from "../Icons"
import './ActionsMenu.style.css'

const MIN_LIMIT = 5
const MAX_LIMIT = 60

export const ActionsMenu = () => {

  const { state, patchState } = useGlobalContext()

  const resetGame = () => {
    const oldLimit = state.timeLimit
    
    patchState({ activePlayer: undefined, timeLimit: 0 })

    setTimeout(() => {
      patchState({ timeLimit: oldLimit })
    }, 500)
  }

  return (
    <div className='actions-menu'>
      <button
        className="actions-menu--btn round-circle" 
        disabled={state.timeLimit <= MIN_LIMIT || !!state.activePlayer} 
        onClick={() => patchState({ timeLimit: state.timeLimit - 1 })}
      >
        <MinusIcon />
      </button>
      <button 
        className="actions-menu--btn" 
        onClick={resetGame}
      >
        <ReloadIcon />
      </button>
      <button 
        className="actions-menu--btn round-circle"
        disabled={state.timeLimit >= MAX_LIMIT || !!state.activePlayer} 
        onClick={() => patchState({ timeLimit: state.timeLimit + 1 })}
      >
        <PlusIcon />
      </button>
    </div> 
  )
}