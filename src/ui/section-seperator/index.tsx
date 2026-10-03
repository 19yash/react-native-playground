import React from 'react'

import { SpacingNames } from '@/types/theme'

import LinearGradient from '../linear-gradient'
import Text from '../text'
import { StyledSectionSeparatorView } from './styles'

const SectionSeperator: React.FC<{
  i18n: string
  spacingTop?: SpacingNames
  spacingBottom?: SpacingNames
}> = ({ i18n, spacingBottom = 'none', spacingTop = 'none' }) => {
  return (
    <StyledSectionSeparatorView
      spacingBottom={spacingBottom}
      spacingTop={spacingTop}
    >
      <LinearGradient
        flow="horizontal"
        colors={['#FFFFFF', '#E6E6E6']}
        style={{
          flex: 1,
          height: 2,
        }}
      />
      <Text
        i18n={i18n}
        variant="body_xs.medium"
        color="color-neutral-800"
        letterSpacing={4}
      />
      <LinearGradient
        flow="horizontal"
        colors={['#E6E6E6', '#FFFFFF']}
        style={{
          flex: 1,
          height: 2,
        }}
      />
    </StyledSectionSeparatorView>
  )
}

export default SectionSeperator
