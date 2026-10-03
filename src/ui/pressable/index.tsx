import React from 'react'
import { Pressable as RNPressable } from 'react-native'

import { PressableWrapperProps } from './typings'

const Pressable: React.FC<PressableWrapperProps> = ({
  children,
  opacityOnPress = 0.7,
  scaleOnPress = 0.98,
  style,
  ...pressableProps
}) => {
  return (
    <RNPressable
      style={(state) => [
        {
          opacity: state.pressed ? opacityOnPress : 1,
          transform: [{ scale: state.pressed ? scaleOnPress : 1 }],
        },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...pressableProps}
    >
      {children}
    </RNPressable>
  )
}

export default Pressable
