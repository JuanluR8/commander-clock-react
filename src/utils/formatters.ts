import { MINUTE_IN_MS } from '@/constants'

const twoDigitStr = (n: number): string => n.toString().padStart(2, '0')

export const formatTime = (ms: number): string => {
  const abs = Math.abs(ms)
  const minutes = Math.floor(abs / MINUTE_IN_MS)
  const seconds = Math.floor((abs % MINUTE_IN_MS) / 1000)

  const formated = [minutes, seconds].map(twoDigitStr).join(':')

  return ms < 0 ? `-${formated}` : formated
}
