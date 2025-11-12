import { PropsWithChildren, useEffect, useMemo } from 'react'
import noSleep from 'nosleep.js'

export const NoSleep = ({ children }: PropsWithChildren) => {
  const ns = useMemo(() => new noSleep(), [noSleep])

  const enableNoSleep = async () => {
    await ns.enable()
    document.removeEventListener('touchstart', enableNoSleep)
    document.removeEventListener('click', enableNoSleep)
  }

  useEffect(() => {
    document.addEventListener('touchstart', enableNoSleep, { once: true })
    document.addEventListener('click', enableNoSleep, { once: true })

    return () => {
      ns.disable()
    }
  }, [])

  return children
}
