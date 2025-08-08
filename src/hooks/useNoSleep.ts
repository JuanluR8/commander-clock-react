import { useEffect, useMemo } from 'react'
import NoSleep from 'nosleep.js'

export const useNoSleep = () => {
  const noSleep = useMemo(() => new NoSleep(), [])

  useEffect(() => {
    const enableNoSleep = () => {
      noSleep.enable()
      document.removeEventListener('touchstart', enableNoSleep)
      document.removeEventListener('click', enableNoSleep)
    }

    document.addEventListener('touchstart', enableNoSleep, { once: true })
    document.addEventListener('click', enableNoSleep, { once: true })

    return () => {
      noSleep.disable()
    }
  }, [noSleep])
}
