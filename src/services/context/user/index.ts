import { createContext, useContext } from 'react'

import { UserContextType } from './typings'

export const defaultContext: UserContextType = {
  isUserLoading: true,
  fetchUser: async () => {},
  resetUser: () => {},
  setUser: () => {},
  userProfile: null,
  isUserReady: false,
}

export const UserContext = createContext<UserContextType>(null as any)

export const useUser = () => useContext(UserContext)
