import React, { useEffect } from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

export interface ShimmerProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: ViewStyle
}

export function Shimmer({
  width = '100%',
  height = 16,
  borderRadius = 6,
  style,
}: ShimmerProps) {
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.bezier(0.4, 0, 0.6, 1),
      }),
      -1,
      true,
    )
  }, [progress])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0.3, 0.7]),
  }))

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.shimmer,
        {
          width: width as number,
          height: height as number,
          borderRadius,
        },
        animatedStyle,
        style,
      ]}
    />
  )
}

export function SkeletonCard({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.card, style]}>
      <Shimmer height={140} borderRadius={8} style={{ marginBottom: 12 }} />
      <Shimmer height={20} width="70%" style={{ marginBottom: 8 }} />
      <Shimmer height={14} width="40%" />
    </View>
  )
}

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: 'rgba(150, 150, 150, 0.25)',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(150, 150, 150, 0.08)',
    marginBottom: 16,
  },
})

export default Shimmer
