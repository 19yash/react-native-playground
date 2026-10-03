import React, { ReactNode, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import { Config } from '@/configs'
import { darkTheme, lightTheme } from '@/constants/theme'
import { getPreferredTheme, setPreferredTheme } from '@/services/async-storage'
import { ThemeContext } from '@/services/context/theme'
import { ThemeType } from '@/types'

interface Props {
  children: ReactNode
}

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const systemScheme = useColorScheme()
  const [theme, setThemeState] = useState<ThemeType>(
    (Config.defaultTheme as ThemeType) || ThemeType.dark,
  )
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved theme on mount.
  useEffect(() => {
    loadTheme()
  }, [])

  const loadTheme = async () => {
    try {
      const savedTheme = await getPreferredTheme()

      if (savedTheme) {
        setThemeState(savedTheme as ThemeType)
      } else if (systemScheme) {
        // No saved preference, use system.
        setThemeState(systemScheme as ThemeType)
      }
    } catch (error) {
      console.warn('Failed to load theme:', error)
      // Fallback to system.
      if (systemScheme) setThemeState(systemScheme as ThemeType)
    } finally {
      setIsLoaded(true)
    }
  }

  const toggleTheme = async () => {
    const newTheme =
      theme === ThemeType.light ? ThemeType.dark : ThemeType.light
    await setTheme(newTheme)
  }

  const setTheme = async (newTheme: ThemeType) => {
    try {
      await setPreferredTheme(newTheme)
      setThemeState(newTheme)
    } catch (error) {
      console.warn('Failed to save theme:', error)
    }
  }

  // Show loading until theme is loaded
  if (!isLoaded) {
    return null // Or a SplashScreen component
  }

  const uikit = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider
      value={{
        theme,
        uikit,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
