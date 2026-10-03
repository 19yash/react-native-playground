import React, { FC } from 'react'

import { getTypographyStyle } from '@/helpers/theme'

import { StyledText } from './styles'
import { TextProps } from './typings'

const Text: FC<TextProps> = ({
  variant = 'body_md.medium',
  align = 'left',
  lineHeight,
  letterSpacing,
  ...props
}) => {
  const typographyStyle = getTypographyStyle(variant)

  if (props.i18n) {
    props.children = props.i18n
  }

  return (
    <StyledText
      size={typographyStyle.fontSize}
      align={align}
      family={typographyStyle.fontFamily}
      weight={typographyStyle.fontWeight}
      lineHeight={lineHeight ?? typographyStyle.lineHeight}
      letterSpacing={letterSpacing ?? typographyStyle.letterSpacing}
      {...props}
    />
  )
}

export default Text
