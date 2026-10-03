import { StyleSheet } from 'react-native'
import { styled } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

export const StyledItemView = styled.View`
  flex-direction: row;
  gap: 8px;
`

export const StyledWrapperView = styled.View<{
  backgroundColor?: ColorKey
}>`
  flex-direction: row;
  background-color: ${(props) =>
    props.theme.colors[props.backgroundColor ?? 'color-neutral-200']};
  border-radius: 999px;
  padding: 8px;
  position: relative;
  ${(props) => props.theme.utils.shadow(3, 4, '#000', 0.1, 50, 10)}
`

export const ActiveBackground = styled.View`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  background-color: #2c2c2c;
  border-radius: 999px;
`

export const Segment = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 16px;
  z-index: 1;
`

export const Label = styled.Text`
  font-size: 14px;
  color: #9a9a9a;
  font-weight: 500;
`

export const ActiveLabel = styled.Text`
  color: #d9f4f6;
  font-weight: 600;
`

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    borderRadius: 999,
    padding: 8,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    backgroundColor: '#2C2C2C',
    borderRadius: 999,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    color: '#9A9A9A',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#D9F4F6',
    fontWeight: '600',
  },
})
