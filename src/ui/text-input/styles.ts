import { styled } from 'styled-components/native'

import { SpacingNames } from '@/types/theme'

export const TextInputContainer = styled.View<{ marginBottom: SpacingNames }>`
  width: 100%;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.marginBottom || 'none']}px;
`
