import { DimensionValue } from 'react-native'
import { styled } from 'styled-components/native'

export const StyledPlaceholderView = styled.View`
  flex: 1;
`

export const StyledImageView = styled.View<{
  width: DimensionValue
  height: DimensionValue
}>`
  width: ${(props) => props.width as any};
  height: ${(props) => props.height as any};
`
