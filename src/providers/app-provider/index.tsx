import React, { createContext, useContext, useMemo, useState } from 'react'

export interface ApplicationContextValue {
  isAppReady: boolean
  setAppReady: (ready: boolean) => void
}

const ApplicationContext = createContext<ApplicationContextValue>({
  isAppReady: true,
  setAppReady: () => {},
})

export const useApplication = () => useContext(ApplicationContext)

export const ApplicationProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isAppReady, setAppReady] = useState(true)

  const value = useMemo(() => ({ isAppReady, setAppReady }), [isAppReady])

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}

export default ApplicationProvider
