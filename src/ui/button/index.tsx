import { Button as RNEButton } from '@rneui/base'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

import Text from '../text'
import { ButtonProps } from './typings'

const defaultColor = 'color-neutral-1100'
const defaultTitleColor = 'color-neutral-100'

const Button: FC<ButtonProps> = ({
  titleVariant,
  full = true,
  type = 'solid',
  disabledButtonColor = 'color-neutral-400',
  borderRadius = 12,
  spacingBottom = 0,
  paddingVertical = 16,
  paddingHorizontal = 16,
  color = defaultColor,
  titleColor = defaultTitleColor,
  spacingTop = 0,
  ...props
}) => {
  const theme = useTheme()

  const width = full ? '100%' : 'auto'
  const alignSelf = full ? 'stretch' : 'flex-start'
  const children = props.i18n || props.children
  const _titleColor = titleColor
  const borderColor = (theme.colors[props.borderColor || defaultColor] ||
    theme.colors[defaultColor]) as string
  const buttonColor = (theme.colors[color || defaultColor] ||
    theme.colors[defaultColor]) as string
  const borderWidth = props.borderWidth ?? (type === 'outline' ? 1 : 0)
  // const marginBottom = getSpacingValue(spacingBottom, theme);
  // const borderRadiusValue = getSpacingValue(borderRadius, theme);
  // const paddingVerticalValue = getSpacingValue(paddingVertical, theme);
  // const paddingHorizontalValue = getSpacingValue(paddingHorizontal, theme);

  // console.log("[Button]:", _titleColor);
  return (
    <RNEButton
      type={type}
      color={buttonColor}
      containerStyle={{ width, alignSelf }}
      buttonStyle={{
        paddingVertical: 16,
        paddingHorizontal,
        borderRadius,
        marginBottom: spacingBottom,
        marginTop: spacingTop,
        borderColor,
        borderWidth,
      }}
      disabledStyle={{
        backgroundColor: (theme.colors[disabledButtonColor as ColorKey] ||
          disabledButtonColor) as string,
      }}
      TouchableComponent={TouchableOpacity as unknown as typeof React.Component}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          i18n={children}
          variant={titleVariant}
          color={_titleColor as any}
        />
      ) : typeof children === 'function' ? (
        (children as any)({} as any)
      ) : (
        children
      )}
    </RNEButton>
  )
}

export default Button
