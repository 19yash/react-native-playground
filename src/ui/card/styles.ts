import { styled } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'
import { SpacingNames } from '@/types/theme'

/**
 * Outer layout container (spacing only)
 */
export const StyledCardContainerView = styled.View<{
  spacingTop: SpacingNames
  spacingBottom: SpacingNames
  paddingBottom: SpacingNames
  fillWidth?: boolean
}>`
  width: ${(props) => (props.fillWidth ? '100%' : 'auto')};
  margin-top: ${(props) => props.theme.spacing[props.spacingTop]}px;
  margin-bottom: ${(props) => props.theme.spacing[props.spacingBottom]}px;
  padding-bottom: ${(props) => props.theme.spacing[props.paddingBottom]}px;
  overflow: visible;
`

/**
 * Shadow-only wrapper
 * - NO radius
 * - NO overflow hidden
 */
export const CardShadowWrapper = styled.View<{
  hideShadow: boolean
  backgroundColor: ColorKey
  borderRadius: SpacingNames
}>`
  shadow-color: ${(props) => props.theme.colors['color-neutral-500']};
  shadow-opacity: ${(props) => (props.hideShadow ? 0 : 0.15)};
  shadow-radius: ${(props) => (props.hideShadow ? 0 : 8)}px;
  elevation: ${(props) => (props.hideShadow ? 0 : 12)};
  overflow: visible;
  background-color: ${(props) => props.theme.colors[props.backgroundColor]};
  border-radius: ${(props) => props.theme.spacing[props.borderRadius]}px;
`

/**
 * Actual card surface
 * - Radius
 * - Clipping
 * - Background
 */
export const StyledCardSurface = styled.View<{
  color: ColorKey
  borderColor: ColorKey
  borderRadius: SpacingNames
  paddingVertical: SpacingNames
  paddingHorizontal: SpacingNames
  fillHeight: boolean
  showTopRadius: boolean
  showBottomRadius: boolean
}>`
  background-color: ${(props) => props.theme.colors[props.color]};
  padding-vertical: ${(props) => props.theme.spacing[props.paddingVertical]}px;
  padding-horizontal: ${(props) =>
    props.theme.spacing[props.paddingHorizontal]}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors[props.borderColor]};
  border-top-left-radius: ${(props) =>
    props.theme.spacing[props.showTopRadius ? props.borderRadius : 'none']}px;
  border-top-right-radius: ${(props) =>
    props.theme.spacing[props.showTopRadius ? props.borderRadius : 'none']}px;
  border-bottom-left-radius: ${(props) =>
    props.theme.spacing[
      props.showBottomRadius ? props.borderRadius : 'none'
    ]}px;
  border-bottom-right-radius: ${(props) =>
    props.theme.spacing[
      props.showBottomRadius ? props.borderRadius : 'none'
    ]}px;
  flex-grow: ${(props) => (props.fillHeight ? 1 : 0)};
  overflow: hidden;
`
