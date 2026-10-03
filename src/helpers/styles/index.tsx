import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { styled } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'
import { SpacingNames } from '@/types/theme'

interface StyledSafeAreaViewProps extends SafeAreaViewProps {
  backgroundColor?: ColorKey
}

export const StyledSafeAreaView = styled(
  SafeAreaView,
).attrs<StyledSafeAreaViewProps>((props) => ({
  edges: props.edges || ['left', 'right', 'top'],
}))`
  flex-grow: 1;
  background-color: ${(props) =>
    props.theme.colors[props.backgroundColor || 'color-neutral-100']};
`

/**
 * `StyledPageWrapper` provides consistent treatment for the margin across the app. Should be used as the top enclosing component for any tab or page.
 */
export const StyledPageWrapper = styled.View<{
  spacingHorizontal?: SpacingNames
  spacingBottom?: SpacingNames
  spacingTop?: SpacingNames
  paddingHorizontal?: SpacingNames
}>`
  flex: 1;
  margin-top: ${(props) => props.theme.spacing[props.spacingTop || 'none']}px;
  margin-bottom: ${(props) =>
    props.theme.spacing[props.spacingBottom || 'md']}px;
  margin-horizontal: ${(props) =>
    props.theme.spacing[props.spacingHorizontal || 'sm']}px;
  padding-horizontal: ${(props) =>
    props.theme.spacing[props.paddingHorizontal || 'none']}px;
`

export const StyledScrollView = styled.ScrollView`
  flex-grow: 1;
`

export const StyledSectionView = styled.View<{
  spacingBottom?: SpacingNames
  spacingTop?: SpacingNames
  spacingHorizontal?: SpacingNames
  padding?: SpacingNames
}>`
  margin-bottom: ${(props) =>
    props.theme.spacing[props.spacingBottom || 'none']}px;
  margin-top: ${(props) => props.theme.spacing[props.spacingTop || 'none']}px;
  margin-horizontal: ${(props) =>
    props.theme.spacing[props.spacingHorizontal || 'none']}px;
  padding: ${(props) => props.theme.spacing[props.padding || 'none']}px;
`

export const StyledContentView = styled.View`
  background-color: white;
  margin-top: -16px;
  padding: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  gap: 2px;
`

export const StyledRowView = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const StyledItemView = styled.View`
  flex: 1;
`
