import React from 'react'
import { ViewStyle } from 'react-native'

import { ColorKey } from '@/constants/colors'
import { SpacingNames } from '@/types/theme'

export interface CardProps {
  children: React.ReactNode
  marginBottom?: SpacingNames
  color?: ColorKey
  hideShadow?: boolean
  borderColor?: ColorKey
  radius?: SpacingNames
  paddingHorizontal?: SpacingNames
  paddingVertical?: SpacingNames
  fillHeight?: boolean
  fillWidth?: boolean
  spacingTop?: SpacingNames
  spacingBottom?: SpacingNames
  showTopRadius?: boolean
  showBottomRadius?: boolean
  onPress?: () => void
  paddingBottom?: SpacingNames
  overflow?: ViewStyle['overflow']
}
