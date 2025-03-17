import { useCallback, useEffect, useState } from 'react'
import { MINUTE_IN_MS } from '@/constants'
import { formatTime } from '@/utils'
import { useGlobalContext } from '@/contexts'
import './Playerclock.styles.css'

interface Props {
  playerId: number
  onClick: () => void
}

export const PlayerClock = (props: Props) => {
  const { playerId } = props

  const state = useGlobalContext()
  const [time, setTime] = useState(0)

  const isActive = state.activePlayer === playerId
  const articleClasses = [
    'player-clock',
    ...isActive ? ['active'] : [],
    ...playerId < (state.numPlayers / 2) ? ['flip'] : []
  ]

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
      className={articleClasses.join(' ')}
      onClick={props.onClick}
    >
      <div className="player-clock--time">
        {formatTime(time)}
      </div>
    </article>
  )
}