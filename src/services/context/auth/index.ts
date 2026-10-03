import React from 'react'

import { AuthContextType } from './typings'

export const defaultContext: AuthContextType = {
  isAuthLoading: true,
  hasUserLoggedIn: false,
  setHasUserLoggedIn: () => {},
  authenticateUser: async () => {},
  logoutUser: async () => {},
}

export const AuthContext = React.createContext<AuthContextType>(defaultContext)

export const useAuth = () => {
  return React.useContext(AuthContext)
}
