import React, { createContext } from 'react'

import { ApplicationContextValue } from './typings'

export const defaultContext: ApplicationContextValue = {
  isAppReady: true,
  setAppReady: () => {},
}

export const ApplicationContext =
  createContext<ApplicationContextValue>(defaultContext)

export const useApplication = () => {
  return React.useContext(ApplicationContext)
}
