import { RefObject, useEffect, useState } from 'react'

export interface TabInterfaceData {
  tabId: string
  panelId: string
  tabRef: RefObject<HTMLButtonElement> | null
  panelRef: RefObject<HTMLElement> | null
}

// Adds keyboard and mouse controls for tab panel interface
export const useTabPanelInterface = (
  tabsAndPanels: TabInterfaceData[]
): number => {
  const [categoryIndex, setCategoryIndex] = useState(0)

  const changeCategoryIndex = (index: number) => {
    if (tabsAndPanels[index]) {
      const nextTabRef = tabsAndPanels[index].tabRef?.current

      if (nextTabRef) {
        nextTabRef.focus()
      }

      setCategoryIndex(index)
    }
  }

  useEffect(() => {
    const currentTabRef = tabsAndPanels[categoryIndex].tabRef?.current
    const currentPanelRef = tabsAndPanels[categoryIndex].panelRef?.current

    const focusPanel = () => {
      if (currentPanelRef) {
        currentPanelRef.focus()
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowLeft', 'ArrowDown'].includes(event.code)) {
        event.preventDefault()
      }

      if (event.code === 'ArrowRight') {
        changeCategoryIndex(categoryIndex + 1)
      }

      if (event.code === 'ArrowLeft') {
        changeCategoryIndex(categoryIndex - 1)
      }

      if (event.code === 'ArrowDown') {
        focusPanel()
      }
    }

    if (currentTabRef) {
      currentTabRef.addEventListener('keydown', onKeyDown)
    }

    return () => {
      if (currentTabRef) {
        currentTabRef.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [categoryIndex])

  useEffect(() => {
    const onClick = (index: number): void => {
      changeCategoryIndex(index)
    }

    tabsAndPanels.forEach((data: TabInterfaceData, index: number) => {
      if (data.tabRef?.current) {
        data.tabRef.current.addEventListener('click', () => onClick(index))
      }
    })

    return () => {
      tabsAndPanels.forEach((data: TabInterfaceData, index: number) => {
        if (data.tabRef?.current) {
          data.tabRef.current.removeEventListener('click', () => onClick(index))
        }
      })
    }
  }, [])

  return categoryIndex
}
