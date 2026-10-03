import React, { FC, useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

import Icon from '.'
import { RotatingIconProps } from './typings'

export const RotatingIcon: FC<RotatingIconProps> = ({
  name,
  color = 'color-primary-500',
  type,
  width,
  height,
}) => {
  const rotation = useSharedValue(0)

  useEffect(() => {
    // Rotate infinitely at a smooth, steady pace
    rotation.value = withRepeat(
      withTiming(360, { duration: 1200, easing: Easing.linear }),
      -1, // infinite
      false,
    )
  }, [rotation])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={animatedStyle}>
      <Icon
        name={name}
        type={type}
        color={color}
        width={width}
        height={height}
      />
    </Animated.View>
  )
}
