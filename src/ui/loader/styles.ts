import { styled } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

export const StyledIndicatorView = styled.View<{
  bgColor?: string
  inline?: boolean
}>`
  ${(props) => !props.inline && 'flex: 1;'}
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.bgColor
      ? (props.theme.colors[props.bgColor as ColorKey] ?? props.bgColor)
      : props.inline
        ? 'transparent'
        : props.theme.colors['color-surface-bg-primary']};
  ${(props) => !props.inline && 'width: 100%; height: 100%;'}
  padding: ${(props) => (props.inline ? '16px' : '0px')};
`

export const StyledLoaderLabel = styled.Text`
  color: ${(props) => props.theme.colors['color-neutral-600']};
  font-size: 13px;
  font-family: 'Manrope_500Medium';
  margin-top: 14px;
  letter-spacing: 0.8px;
  text-align: center;
  text-transform: uppercase;
`
