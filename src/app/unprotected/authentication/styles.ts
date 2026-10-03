import { styled } from 'styled-components/native'

export const BrandContainer = styled.View`
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.xxl}px;
  margin-bottom: ${(props) => props.theme.spacing.xl}px;
`

export const FormContainer = styled.View`
  flex: 1;
`

export const ActionWrapper = styled.View`
  padding-bottom: ${(props) => props.theme.spacing.lg}px;
  gap: ${(props) => props.theme.spacing.sm}px;
`
