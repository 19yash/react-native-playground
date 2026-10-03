import {
  LinearGradient as ExpoLinearGradient,
  LinearGradientProps,
} from 'expo-linear-gradient'
import React from 'react'
import { ColorValue, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@/services/context/theme'

type GradientFlow = 'vertical' | 'horizontal' | 'diagonal'

interface GradientWrapperProps extends Omit<LinearGradientProps, 'colors'> {
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]]
  children?: React.ReactNode
  flow?: GradientFlow
  style?: ViewStyle
}

const LinearGradient: React.FC<GradientWrapperProps> = ({
  colors,
  flow = 'vertical',
  locations,
  style,
  children,
}) => {
  const { uikit } = useTheme()
  const getGradientPoints = (flowType: GradientFlow) => {
    switch (flowType) {
      case 'vertical':
        return {
          start: { x: 0, y: 0 }, // Top
          end: { x: 0, y: 1 }, // Bottom
        }
      case 'horizontal':
        return {
          start: { x: 0, y: 0.5 }, // Left
          end: { x: 1, y: 0.5 }, // Right
        }
      case 'diagonal':
        return {
          start: { x: 0, y: 0 }, // Top-left
          end: { x: 1, y: 1 }, // Bottom-right
        }
      default:
        return {
          start: { x: 0, y: 0 },
          end: { x: 0, y: 1 },
        }
    }
  }

  const { start, end } = getGradientPoints(flow)

  const colorValues = colors.map((color) => {
    if (typeof color === 'string') {
      return (uikit?.colors as any)?.[color] ?? color
    }
    return color
  }) as [ColorValue, ColorValue, ...ColorValue[]]

  return (
    <ExpoLinearGradient
      colors={colorValues}
      start={start}
      end={end}
      locations={locations}
      style={[styles.defaultStyle, style]}
    >
      {children}
    </ExpoLinearGradient>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    minHeight: 1,
  },
})

export default LinearGradient
