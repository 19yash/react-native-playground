import React from 'react'
import { DefaultTheme } from 'styled-components/native'

import { Config } from '@/configs'
import { lightTheme } from '@/constants/theme'
import { ThemeType } from '@/types'

interface ThemeContextType {
  theme: ThemeType
  uikit: typeof lightTheme
  toggleTheme: () => Promise<void>
  setTheme: (theme: ThemeType) => Promise<void>
}

const defaultContext: ThemeContextType = {
  theme: Config.defaultTheme as ThemeType,
  setTheme: async () => {},
  toggleTheme: async () => {},
  uikit: {} as DefaultTheme,
}

export const ThemeContext =
  React.createContext<ThemeContextType>(defaultContext)

export const useTheme = () => {
  return React.useContext(ThemeContext)
}
