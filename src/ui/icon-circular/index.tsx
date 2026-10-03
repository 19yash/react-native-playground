import React, { FC } from 'react'
import { ColorValue, TouchableOpacity } from 'react-native'

import { useTheme } from '@/services/context/theme'

import Icon from '../icon'
import { styles } from './styles'
import { IconCircularProps } from './typings'

const IconCircular: FC<IconCircularProps> = ({
  color = 'color-primary-500',
  circleColor = 'color-primary-200',
  circleSize = 50,
  rightSpacing = 0,
  onPress,
  ...props
}) => {
  const { uikit } = useTheme()

  return (
    <TouchableOpacity
      style={{
        ...styles.view,
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: (uikit.colors[circleColor] ||
          uikit.colors['color-primary-200']) as ColorValue,
        marginRight: rightSpacing,
      }}
      onPress={onPress}
      {...(!onPress && { disabled: true })}
    >
      <Icon color={color} {...props} />
    </TouchableOpacity>
  )
}

export default IconCircular
