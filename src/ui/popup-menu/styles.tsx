import { styled } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

interface StyledItemContainerProps {
  backgroundColor?: ColorKey
  isActive?: boolean
  radius?: number
}

export const StyledItemContainer = styled.View<StyledItemContainerProps>`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: ${(props) =>
    props.isActive && props.backgroundColor
      ? props.theme.colors[props.backgroundColor]
      : 'transparent'};
  border-radius: ${(props) => props.radius || 12}px;
`

export const StyledItemTextView = styled.View`
  flex: 1;
`

interface StyledItemIconViewProps {
  width?: number
  height?: number
}

export const StyledItemIconView = styled.View<StyledItemIconViewProps>`
  width: ${(props) => props.width || 24}px;
  height: ${(props) => props.height || 22}px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`

interface StyledItemBottomBorderProps {
  borderColor?: ColorKey
}

export const StyledItemBottomBorder = styled.View<StyledItemBottomBorderProps>`
  height: 1px;
  background-color: ${(props) =>
    props.borderColor
      ? props.theme.colors[props.borderColor]
      : props.theme.colors['color-gray-200']};
  margin: 0 16px;
`
