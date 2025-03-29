import { useEffect, useState } from 'react'
import { useGlobalContext } from '@/contexts'
import { BaseBtn } from '../BaseBtn/BaseBtn'
import { CloseIcon, MinusIcon, PlusIcon } from '../Icons'
import './SettingsDialog.styles.css'
import { BaseRadioGroup } from '../BaseRadioGroup/BaseRadioGroup'

export const MIN_LIMIT = 5
export const MAX_LIMIT = 60
const NUM_PLAYERS_OPTIONS = [2, 4]

interface Props {
  open: boolean
  onClose: () => void
}

export const SettingsDialog = (props: Props) => {
  const { open, onClose } = props
  const { state, patchState } = useGlobalContext()
  const [settings, setSettings] = useState({ ...state })

  const updateTimeLimit = (value: number) => {
    setSettings(prevState => ({ ...prevState, timeLimit: value }))
  }

  const updateNumPlayers = (value: number) => {
    setSettings(prevState => ({ ...prevState, numPlayers: value }))
  }

  const resetGame = () => {
    patchState({ activePlayer: undefined, timeLimit: 0 })

    setTimeout(() => {
      updateTimeLimit(state.timeLimit)
      saveSettings()
    }, 500)
  }

  const saveSettings = () => {
    patchState({ ...settings, activePlayer: undefined })
    onClose()
  }

  useEffect(() => {
    setSettings({ ...state })
  }, [])

  return (
    <>
      <dialog className="settings-dialog" open={open}>
        <header>
          <h4>Settings</h4>
          <BaseBtn
            aria-label="Close dialog"
            className="actions-menu--btn btn--close"
            rounded
            onClick={onClose}
          >
            <CloseIcon />
          </BaseBtn>
        </header>

        <div className="row">
          <legend>Time Limit</legend>

          <div className="row--inputs">
            <BaseBtn
              className="actions-menu--btn square round-circle"
              aria-label="Decrease time limit"
              disabled={settings.timeLimit <= MIN_LIMIT}
              rounded
              onClick={() => updateTimeLimit(settings.timeLimit - 1)}
            >
              <MinusIcon />
            </BaseBtn>

            <span className="time-limit">{settings.timeLimit}</span>

            <BaseBtn
              className="actions-menu--btn square round-circle"
              aria-label="Increase time limit"
              disabled={state.timeLimit >= MAX_LIMIT}
              rounded
              onClick={() => updateTimeLimit(settings.timeLimit + 1)}
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
              onChange={updateNumPlayers}
            />
          </div>
        </div>

        <footer>
          <BaseBtn
            className="actions-menu--btn"
            aria-label="Reset"
            onClick={resetGame}
            style={{ marginTop: '1rem' }}
          >
            Reset Game
          </BaseBtn>

          <BaseBtn
            className="actions-menu--btn btn--close"
            onClick={saveSettings}
          >
            Save settings
          </BaseBtn>
        </footer>
      </dialog>
      <div className="overlay" onClick={onClose} />
    </>
  )
}
