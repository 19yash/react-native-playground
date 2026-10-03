import React, { FC } from 'react'
import { ThemeProvider } from 'styled-components/native'

import { darkTheme, lightTheme } from '@/constants/theme'
import { useTheme } from '@/services/context/theme'
import { ThemeType } from '@/types'

const StyledThemeProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme()

  const currentTheme = theme === ThemeType.dark ? darkTheme : lightTheme

  return <ThemeProvider theme={{ ...currentTheme }}>{children}</ThemeProvider>
}

export default StyledThemeProvider
