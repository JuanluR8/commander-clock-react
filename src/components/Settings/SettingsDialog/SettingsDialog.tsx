import { useEffect, useRef, useState } from 'react'
import { type GlobalState, useGlobalContext } from '@/contexts'
import {
  BaseBtn,
  BaseRadioGroup,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from '@/components'
import './SettingsDialog.styles.css'
import { MAX_LIMIT, MIN_LIMIT } from '@/constants'

const NUM_PLAYERS_OPTIONS = [2, 4]

export interface SettingsDialogProps {
  open: boolean
  onClose: () => void
}

export const SettingsDialog = (props: SettingsDialogProps) => {
  const { open, onClose } = props
  const { state, updateState } = useGlobalContext()
  const [settings, setSettings] = useState<GlobalState>({ ...state })

  const dialogRef = useRef<HTMLDialogElement>(null)

  const updateSettings = (draft: Partial<GlobalState>) => {
    setSettings(prevState => ({ ...prevState, ...draft }))
  }

  const resetGame = () => {
    updateState({ activePlayer: undefined, timeLimit: 0 })

    setTimeout(() => {
      updateSettings({ timeLimit: state.timeLimit })
      commitSettings()
    }, 500)
  }

  const commitSettings = () => {
    updateState({ ...settings, activePlayer: undefined })
    onClose()
  }

  useEffect(() => {
    setSettings({ ...state })
  }, [])

  useEffect(() => {
    if (!dialogRef.current) return

    if (open) {
      dialogRef.current?.showModal()
      return
    }

    dialogRef.current?.close()
  }, [open])

  return (
    <dialog className="settings-dialog" ref={dialogRef}>
      <header>
        <h4>Settings</h4>

        <BaseBtn
          aria-label="Close"
          className="actions-menu--btn btn--close rounded"
          onClick={onClose}
        >
          <CloseIcon />
        </BaseBtn>
      </header>

      <div className="row">
        <legend>Time Limit</legend>

        <div className="row--inputs">
          <BaseBtn
            className="actions-menu--btn square rounded"
            aria-label="Decrease time limit"
            disabled={settings.timeLimit <= MIN_LIMIT}
            onClick={() =>
              updateSettings({ timeLimit: settings.timeLimit - 1 })
            }
          >
            <MinusIcon />
          </BaseBtn>

          <span className="time-limit">{settings.timeLimit}</span>

          <BaseBtn
            className="actions-menu--btn square rounded"
            aria-label="Increase time limit"
            disabled={state.timeLimit >= MAX_LIMIT}
            onClick={() =>
              updateSettings({ timeLimit: settings.timeLimit + 1 })
            }
          >
            <PlusIcon />
          </BaseBtn>
        </div>
      </div>

      <div className="row">
        <legend>Num. Players</legend>

        <div className="row--inputs">
          <BaseRadioGroup
            name="num-players"
            options={NUM_PLAYERS_OPTIONS}
            value={settings.numPlayers}
            onChange={numPlayers => updateSettings({ numPlayers })}
          />
        </div>
      </div>

      <footer>
        <BaseBtn
          aria-label="Reset"
          className="actions-menu--btn"
          onClick={resetGame}
        >
          Reset Game
        </BaseBtn>

        <BaseBtn
          aria-label="Save"
          className="actions-menu--btn btn--close"
          onClick={commitSettings}
        >
          Save settings
        </BaseBtn>
      </footer>
    </dialog>
  )
}
