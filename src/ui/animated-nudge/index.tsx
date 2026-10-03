import { useIsFocused } from '@react-navigation/native'
import React, { FC, useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export interface AnimatedNudgeProps {
  children: React.ReactNode
  distance?: number
  duration?: number
  direction?: 'left' | 'right' | 'up' | 'down'
  isEnabled?: boolean
}

const AnimatedNudge: FC<AnimatedNudgeProps> = ({
  children,
  distance = 4,
  duration = 1000,
  direction = 'right',
  isEnabled = true,
}) => {
  const translation = useSharedValue(0)
  const isFocused = useIsFocused()
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  )

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        setAppState(nextAppState)
      },
    )
    return () => {
      subscription.remove()
    }
  }, [])

  // Map semantic directions to coordinate sign values
  const targetValue =
    direction === 'left' || direction === 'up' ? -distance : distance
  const isVertical = direction === 'up' || direction === 'down'

  // Only animate if the component is enabled, the screen is focused, and the app is active (foreground)
  const shouldAnimate = isEnabled && isFocused && appState === 'active'

  useEffect(() => {
    if (shouldAnimate) {
      translation.value = withRepeat(
        withTiming(targetValue, {
          duration,
          easing: Easing.bezier(0.25, 1, 0.5, 1),
        }),
        -1, // Infinite loop
        true, // Reverse timing order on alternate repeat cycles for a smooth back-and-forth swing
      )
    } else {
      translation.value = withTiming(0, { duration: 300 })
    }
  }, [shouldAnimate, targetValue, duration, translation])

  const animatedStyle = useAnimatedStyle(() => {
    if (isVertical) {
      return {
        transform: [{ translateY: translation.value }],
      }
    }
    return {
      transform: [{ translateX: translation.value }],
    }
  })

  return <Animated.View style={animatedStyle}>{children}</Animated.View>
}

export default AnimatedNudge
