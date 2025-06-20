import { useCallback, useEffect, useState } from 'react'
import { MINUTE_IN_MS } from '@/constants'
import { formatTime } from '@/utils'
import { useGlobalContext } from '@/contexts'
import './Playerclock.styles.css'

export const PLAYER_CLOCK_TEST_ID = 'player-clock'

export interface PlayerClockProps {
  playerId: number
}

export const PlayerClock = (props: PlayerClockProps) => {
  const { playerId } = props

  const { state, patchState } = useGlobalContext()
  const [time, setTime] = useState(0)

  const isActive = state.activePlayer === playerId
  const articleClasses = [
    ...(isActive ? ['active'] : []),
    ...(playerId < state.numPlayers / 2 ? ['flip'] : []),
    ...(time < 0 ? ['consumed'] : []),
  ]

  const onClickPlayerTimer = useCallback(() => {
    patchState({
      activePlayer: state.activePlayer === playerId ? undefined : playerId,
    })
  }, [patchState, state.activePlayer, playerId])

  const decreaseTimeout = useCallback(() => {
    const intervalId = setInterval(() => {
      if (!isActive) return

      setTime(prevTime => prevTime - 1000)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isActive])

  const handleTimeLimitChange = useCallback(() => {
    setTime(state.timeLimit * MINUTE_IN_MS)
  }, [state.timeLimit])

  useEffect(decreaseTimeout, [decreaseTimeout])
  useEffect(handleTimeLimitChange, [handleTimeLimitChange])

  return (
    <article
      className={['player-clock', ...articleClasses].join(' ')}
      data-testid={PLAYER_CLOCK_TEST_ID}
      onClick={onClickPlayerTimer}
    >
      <div className="player-clock--time">{formatTime(time)}</div>
    </article>
  )
}
