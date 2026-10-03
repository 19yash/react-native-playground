import { styled } from 'styled-components/native'

import { SpacingNames } from '@/types/theme'

export const StyledDocumentPickerView = styled.View<{
  spacingTop?: SpacingNames
  spacingBottom?: SpacingNames
}>`
  margin-top: ${(props) => props.theme.spacing[props.spacingTop || 'none']}px;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.spacingBottom || 'none']}px;
`

export const StyledEmptyView = styled.View`
  align-items: center;
  justify-content: center;
`

export const StyledDashedView = styled.View<{
  isError?: boolean
}>`
  border-style: dashed;
  border-width: 1px;
  border-color: ${(props) =>
    props.isError ? props.theme.colors['color-danger-200'] : '#8A8A8A'};
  border-radius: 10px;
  padding: 16px;
`

export const StyledDocumentDetailsView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`

export const StyledDocumentDescriptionView = styled.View`
  flex: 1;
`
