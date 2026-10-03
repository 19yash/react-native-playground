import { TextStyle } from 'react-native'
import { styled } from 'styled-components/native'

import { TextProps } from './typings'

export const StyledText = styled.Text<
  TextProps & {
    family?: string
    weight?: TextStyle['fontWeight']
    lineHeight?: number
    letterSpacing?: number
  }
>`
  font-size: ${({ size }) => size}px;
  text-align: ${({ align }) => align};
  color: ${({ theme, color }) => theme.colors[color ?? 'color-neutral-1100']};
  ${({ family }) => (family ? `font-family: ${family};` : '')};
  ${({ weight }) => (weight ? `font-weight: ${weight};` : '')};
  ${({ lineHeight }) => (lineHeight ? `line-height: ${lineHeight}px;` : '')};
  ${({ letterSpacing }) =>
    letterSpacing ? `letter-spacing: ${letterSpacing}px;` : ''};
  margin-bottom: ${(props) =>
    props.theme.spacing[props.spacingBottom || 'none']}px;
  margin-top: ${(props) => props.theme.spacing[props.spacingTop || 'none']}px;
  margin-left: ${(props) => props.theme.spacing[props.spacingLeft || 'none']}px;
  margin-right: ${(props) =>
    props.theme.spacing[props.spacingRight || 'none']}px;
`
