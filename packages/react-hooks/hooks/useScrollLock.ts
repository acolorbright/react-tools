import { useEffect } from 'react'

// Adds scroll-locking classes depending on provided condition
// CSS needs to be implemented for all classes
export const useScrollLock = (
  dependsOn: boolean,
  mobileOnly?: boolean
): void => {
  const className = mobileOnly ? 'scroll-lock-mobile' : 'scroll-lock'
  useEffect(() => {
    const method = dependsOn ? 'add' : 'remove'
    document.body.classList[method](className)
  }, [dependsOn])
}
