import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

import * as Icons from '../../../assets/icons'

export type SvgIconName = keyof typeof Icons

export interface SvgIconProps extends Omit<SvgProps, 'color'> {
  /** Typed icon name with autocomplete support */
  name: SvgIconName
  /** Theme color key or raw color string for the icon fill */
  color?: ColorKey | string
  /** Shorthand for setting both width and height */
  size?: number
}

/**
 * SvgIcon — renders a custom SVG icon from the namespace registry.
 */
const SvgIcon: FC<SvgIconProps> = ({
  name,
  color = 'color-neutral-500',
  size = 20,
  width,
  height,
  ...props
}) => {
  const theme = useTheme()
  const fill =
    theme.colors[color as ColorKey] ??
    color ??
    theme.colors['color-primary-500']
  // eslint-disable-next-line import/namespace
  const IconComponent = Icons[name]

  if (!IconComponent) return null

  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      color={fill}
      {...props}
    />
  )
}

export default SvgIcon
