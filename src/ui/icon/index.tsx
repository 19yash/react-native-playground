import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import SvgIcon, { SvgIconName } from '../svg-icon'
import { IconProps } from './typings'

const ControlledTouchableOpacity: React.FC<TouchableOpacityProps> = ({
  onPress,
  children,
  ...props
}) => {
  if (!onPress) {
    return <>{children}</>
  }

  return (
    <TouchableOpacity onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  )
}

const Icon: React.FC<IconProps> = ({
  name,
  color = 'color-neutral-1100',
  size = 20,
  onPress,
  height = 20,
  width = 20,
  disabled = false,
}) => {
  return (
    <ControlledTouchableOpacity onPress={onPress} disabled={disabled}>
      <SvgIcon
        name={name as SvgIconName}
        color={color}
        width={width as number}
        height={height as number}
        size={size}
      />
    </ControlledTouchableOpacity>
  )
}

export default Icon
