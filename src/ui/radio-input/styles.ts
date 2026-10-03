import { styled } from 'styled-components/native'

import { SpacingNames } from '@/types/theme'

export const StyledViewContainer = styled.View<{
  marginBottom?: SpacingNames
}>`
  margin-bottom: ${(props) =>
    props.theme.spacing[props.marginBottom ?? 'none']};
`

export const StyledOptionsView = styled.View`
  flex-direction: row;
  gap: 30px;
`

export const StyledOptionView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`

export const StyledRadioButtonContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  background-color: ${(props) => props.theme.colors['color-neutral-300']};
  margin-bottom: ${(props) => props.theme.spacing.xs}px;
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.borderRadius.md}px;
`
