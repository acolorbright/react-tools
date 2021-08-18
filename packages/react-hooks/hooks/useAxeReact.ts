import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

export const useAxeReact = (): void => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line import/no-extraneous-dependencies
      import('@axe-core/react').then((axe) =>
        axe.default(React, ReactDOM, 1000)
      )
    }
  }, [])
}
