import { styled } from 'styled-components/native'

export const StyledCounterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors['color-neutral-200']};
  border-radius: 12px;
  padding: 4px;
  background-color: ${(props) => props.theme.colors['color-neutral-100']};
`

export const StyledCounterButton = styled.Pressable<{ disabled?: boolean }>`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors['color-neutral-100']
      : props.theme.colors['color-neutral-200']};
  border-radius: 8px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`

export const StyledCounterValue = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`
