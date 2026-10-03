import { styled } from 'styled-components/native'

export const StyledFAIconContainer = styled.View<{
  size: number
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  align-items: center;
  justify-content: center;
`
