import { useCallback, useEffect, useState } from 'react'
import { MINUTE_IN_MS } from '@/constants'
import { formatTime } from '@/utils'
import { useGlobalContext } from '@/contexts'
import './Playerclock.styles.css'

export const TEST_ID = 'player-clock'

export interface Props {
  playerId: number
}

export const PlayerClock = (props: Props) => {
  const { playerId } = props

  const { state, patchState } = useGlobalContext()
  const [time, setTime] = useState(0)

  const isActive = state.activePlayer === playerId
  const articleClasses = [
    ...isActive ? ['active'] : [],
    ...playerId < (state.numPlayers / 2) ? ['flip'] : []
  ]

  const onClickPlayerTimer = useCallback(() => {
    patchState({ activePlayer: state.activePlayer === playerId
        ? undefined
        : playerId
    })
  }, [patchState, state.activePlayer, playerId])

  const decreaseTimeout = useCallback(() => {
    const intervalId = setInterval(() => {

      if (!isActive) return
      
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId)
          return 0
        }

        return prevTime - 1000
      })
    }, 1000)


    return () => clearInterval(intervalId);
  }, [isActive])

  const handleTimeLimitChange = useCallback(() => {
    setTime(state.timeLimit * MINUTE_IN_MS)
  }, [state.timeLimit])
  
  
  useEffect(decreaseTimeout, [decreaseTimeout])
  useEffect(handleTimeLimitChange, [handleTimeLimitChange])

  return (
    <article 
      className={['player-clock', ...articleClasses].join(' ')}
      data-testid={ TEST_ID }
      onClick={onClickPlayerTimer}
    >
      <div className="player-clock--time">
        { formatTime(time) }
      </div>
    </article>
  )
}