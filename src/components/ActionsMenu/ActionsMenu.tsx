import { type GlobalState } from "@/contexts"
import { MinusIcon, PlusIcon, ReloadIcon } from "../Icons"
import './ActionsMenu.style.css'

const MIN_LIMIT = 5
const MAX_LIMIT = 60

interface Props {
  state: GlobalState
  patchState: (payload: Partial<GlobalState>) => void
}

export const ActionsMenu = (props: Props) => {

  const { state, patchState } = props

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