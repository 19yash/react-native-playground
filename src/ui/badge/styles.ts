import { styled } from 'styled-components/native'

import { ColorKey } from '@/constants/colors'

export const StyledView = styled.View<{
  backgroundColor: ColorKey
}>`
  background-color: ${(props) => props.theme.colors[props.backgroundColor]};
  height: 30px;
  border-radius: 26px;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${(props) => props.theme.spacing.sm};
`
