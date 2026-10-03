import { styled } from 'styled-components/native'

export const StyledImagePlaceholderView = styled.View<{
  size: number
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
  border-width: 2;
  border-color: #e0e0e0;
`
