import { Platform } from 'react-native'
import { styled } from 'styled-components/native'

export const StyledActionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md}px;
  gap: ${(props) => props.theme.spacing.md}px;
`

export const StyledLeftItemView = styled.View``

export const StyledRightItemView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
`

export const StyledRightTitleContainer = styled(StyledRightItemView)``

export const StyledActionSeparator = styled.View`
  height: 1px;
  margin-left: ${(props) => props.theme.spacing.md}px;
`

export const StyledActivityIndicator = styled.View<{
  isActive: boolean
}>`
  width: ${(props) => props.theme.spacing.xs}px;
  height: ${(props) => props.theme.spacing.xs}px;
  border-radius: ${(props) => props.theme.spacing.xs}px;
  margin-right: 6px;
  background-color: ${(props) =>
    props.theme.colors[`color-${props.isActive ? 'success' : 'danger'}-200`]};
`

export const StyledSwitchWrapper = styled.View`
  ${Platform.OS === 'android' ? 'transform: scale(2);' : ''}
`

export const StyledDropdownContainer = styled.View`
  flex-direction: row;
  align-items: center;
`
