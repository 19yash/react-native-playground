import React, { FC, useMemo } from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

import { styles } from './styles'
import { DockProps } from './typings'

const Dock: FC<DockProps> = ({ children, animatedPosition, height = 60 }) => {
  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: animatedPosition.value - height,
        },
      ],
    }),
    [],
  )
  const containerStyle = useMemo(
    () => [styles.dockContainer, containerAnimatedStyle],
    [containerAnimatedStyle, styles.dockContainer],
  )
  return (
    <Animated.View style={[containerStyle, { height }]}>
      {children}
    </Animated.View>
  )
}

export default Dock
