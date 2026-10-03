import React from 'react'

import Pressable from '@/ui/pressable'

import {
  CardShadowWrapper,
  StyledCardContainerView,
  StyledCardSurface,
} from './styles'
import { CardProps } from './typings'

const Card: React.FC<CardProps> = ({
  children,
  color = 'color-neutral-100',
  borderColor = 'color-neutral-100',
  radius = 'sm',
  paddingHorizontal = 'md',
  paddingVertical = 'sm',
  spacingBottom = 'none',
  spacingTop = 'none',
  paddingBottom = 'none',
  fillHeight = false,
  fillWidth = true, // Defaulting to true for backward compatibility
  hideShadow = false,
  showBottomRadius = true,
  showTopRadius = true,
  onPress,
}) => {
  const CardContent = (
    <StyledCardContainerView
      spacingTop={spacingTop}
      spacingBottom={spacingBottom}
      paddingBottom={paddingBottom}
      fillWidth={fillWidth}
    >
      <CardShadowWrapper
        hideShadow={hideShadow}
        backgroundColor={color}
        borderRadius={radius}
        style={
          hideShadow
            ? undefined
            : {
                shadowOffset: { width: 0, height: 4 },
              }
        }
      >
        <StyledCardSurface
          color={color}
          borderColor={borderColor}
          borderRadius={radius}
          paddingHorizontal={paddingHorizontal}
          paddingVertical={paddingVertical}
          fillHeight={fillHeight}
          showTopRadius={showTopRadius}
          showBottomRadius={showBottomRadius}
        >
          {children}
        </StyledCardSurface>
      </CardShadowWrapper>
    </StyledCardContainerView>
  )

  if (onPress) {
    return <Pressable onPress={onPress}>{CardContent}</Pressable>
  }

  return CardContent
}

export default Card
