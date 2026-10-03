import { styled } from 'styled-components/native'

export const TopContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.xl}px;
`

export const ActionContainer = styled.View`
  padding-bottom: ${(props) => props.theme.spacing.lg}px;
  gap: ${(props) => props.theme.spacing.sm}px;
`
