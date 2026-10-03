import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue'
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope'
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat'
import { Platform } from 'react-native'
import { DefaultTheme } from 'styled-components/native'

import colors from './colors'

const spacing = {
  none: 0,
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
}

const borderRadius = {
  none: 0,
  xxxs: 1,
  xxs: 2,
  xs: 3,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 12,
  xxxl: 14,
}

const constants = {
  spacing,
  borderRadius,
}

const utils = {
  shadow:
    (
      xOffset: number,
      yOffset: number,
      color?: string,
      opacity?: number,
      radius?: number,
      elevation?: number,
    ) =>
    (props: { theme: DefaultTheme }) => {
      const shadowColor = color ?? '#ccc'
      const shadowOpacity = opacity ?? 0.1
      const shadowRadius = radius ?? 5
      const elevationFallback = elevation ?? 3

      if (Platform.OS === 'ios') {
        return {
          shadowColor,
          shadowOffset: { width: xOffset, height: yOffset },
          shadowOpacity,
          shadowRadius,
        }
      }
      return {
        elevation: elevationFallback,
        shadowColor,
      }
    },
}

export const customFonts = {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_700Bold,
  BebasNeue_400Regular,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
}

export const lightTheme: DefaultTheme = {
  ...constants,
  colors: {
    ...colors.light,
  },
  utils,
}

export const darkTheme: DefaultTheme = {
  ...constants,
  colors: {
    ...colors.dark,
  },
  utils,
}
