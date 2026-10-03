import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

import { StyledIndicatorView, StyledLoaderLabel } from './styles'

export interface LoaderProps {
  bgColor?: ColorKey
  size?: 'small' | 'large' | number
  label?: string
  color?: ColorKey
  inline?: boolean
}

const Loader: FC<LoaderProps> = ({
  bgColor,
  size = 'large',
  label,
  color = 'color-primary-500',
  inline = false,
}) => {
  const theme = useTheme()

  // Resolve the activity indicator color from the theme or fallback to gold '#e79819'
  const indicatorColor = (theme.colors[color] ||
    color ||
    theme.colors['color-primary-500'] ||
    '#e79819') as string

  return (
    <StyledIndicatorView bgColor={bgColor} inline={inline}>
      <ActivityIndicator size={size} color={indicatorColor} />
      {label ? <StyledLoaderLabel>{label}</StyledLoaderLabel> : null}
    </StyledIndicatorView>
  )
}

export default Loader
