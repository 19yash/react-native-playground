import { styled } from 'styled-components/native'

import { SpacingNames } from '@/types/theme'

export const StyledSectionSeparatorView = styled.View<{
  spacingTop?: SpacingNames
  spacingBottom?: SpacingNames
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: ${(props) => props.theme.spacing[props.spacingTop || 'none']}px;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.spacingBottom || 'none']}px;
`
