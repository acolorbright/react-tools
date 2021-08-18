import { useEffect } from 'react'

interface ScrollPosition {
  x: number
  y: number
}

export const useScrollPosition = (
  callback: (scrollPosition: ScrollPosition) => void,
  dependencies: unknown[] = []
): void => {
  const onScroll = () => {
    callback({
      x: window.scrollX,
      y: window.scrollY,
    })
  }

  useEffect(() => {
    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, dependencies)
}
