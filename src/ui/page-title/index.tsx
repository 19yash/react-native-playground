import React from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'

import Icon from '../icon'
import { IconProps } from '../icon/typings'
import Text from '../text'

export interface PageTitleProps {
  title: string

  /** Left icon (e.g. <Icon name="arrow-left" />) */
  leftIconProps?: IconProps
  onLeftPress?: () => void

  /** Right icon (e.g. <Icon name="settings" />) */
  rightIconProps?: IconProps
  onRightPress?: () => void

  containerStyle?: ViewStyle
}

const SIDE_WIDTH = 48 // keeps title perfectly centered

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  leftIconProps,
  onLeftPress,
  rightIconProps,
  onRightPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Left */}
      <View style={styles.side}>
        {leftIconProps && (
          <TouchableOpacity
            onPress={onLeftPress}
            hitSlop={8}
            disabled={!onLeftPress}
          >
            <Icon {...leftIconProps} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center */}
      <View style={styles.center}>
        <Text numberOfLines={1}>{title}</Text>
      </View>

      {/* Right */}
      <View style={styles.side}>
        {rightIconProps && (
          <TouchableOpacity
            onPress={onRightPress}
            hitSlop={8}
            disabled={!onRightPress}
          >
            <Icon {...rightIconProps} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  side: {
    width: SIDE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
