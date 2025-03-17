import { MINUTE_IN_MS } from '@/constants'

const twoDigitStr = (n: number): string => n.toString().padStart(2, '0')

export const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / MINUTE_IN_MS)
  const seconds = Math.floor((ms % MINUTE_IN_MS) / 1000)

  return [minutes, seconds]
    .map(twoDigitStr)
    .join(':')
}