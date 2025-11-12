import { HTMLAttributes, useState } from 'react'
import { createPortal } from 'react-dom'
import { BaseBtn } from '@/components/BaseBtn/BaseBtn.tsx'
import { MenuIcon } from '@/components/Icons.tsx'
import { SettingsDialog } from '@/components/Settings/SettingsDialog/SettingsDialog.tsx'
import { useGlobalContext } from '@/contexts'

export const AppSettings = (props: HTMLAttributes<HTMLDivElement>) => {
  const { updateState } = useGlobalContext()

  const [dialogOpen, setDialogOpen] = useState(false)

  const openSettings = () => {
    updateState({ activePlayer: undefined })
    setDialogOpen(true)
  }

  const closeSettings = () => {
    setDialogOpen(false)
  }

  return (
    <div {...props}>
      {dialogOpen &&
        createPortal(
          <SettingsDialog open={dialogOpen} onClose={closeSettings} />,
          document.body
        )}

      <BaseBtn
        aria-label="Open settings"
        className="menu--btn"
        onClick={openSettings}
      >
        <MenuIcon />
      </BaseBtn>
    </div>
  )
}
