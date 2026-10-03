import React, { FC } from 'react'

import Text from '../text'
import { StyledView } from './styles'
import { ScoreTagProps } from './typings'

const Badge: FC<ScoreTagProps> = ({
  i18nLabel = '',
  textColor = 'color-success-200',
  bgColor = 'color-neutral-100',
  textSize = 12,
}) => {
  return (
    <StyledView backgroundColor={bgColor}>
      <Text
        align="center"
        variant="body_xs.regular"
        size={textSize}
        color={textColor}
        i18n={i18nLabel}
      />
    </StyledView>
  )
}

export default Badge
