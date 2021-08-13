import { useEffect } from 'react'

const CLASSNAME_KEYBOARD_FOCUS = 'keyboard-focus'

export const useKeyboardFocus = (): void => {
  const handleKeyDownOnce = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      document.documentElement.classList.add(CLASSNAME_KEYBOARD_FOCUS)

      window.removeEventListener('keydown', handleKeyDownOnce)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      window.addEventListener('mousedown', handleMouseDownOnce)
    }
  }

  const handleMouseDownOnce = () => {
    document.documentElement.classList.remove(CLASSNAME_KEYBOARD_FOCUS)

    window.removeEventListener('mousedown', handleMouseDownOnce)
    window.addEventListener('keydown', handleKeyDownOnce)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownOnce)
  }, [])
}
