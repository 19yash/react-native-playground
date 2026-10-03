import { styled } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) =>
    props.theme.colors['color-surface-bg-primary'] ||
    props.theme.colors['color-neutral-100']};
`

export const Header = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-bottom: ${(props) => props.theme.spacing.sm}px;
`

export const SearchInputWrapper = styled.View`
  margin-top: ${(props) => props.theme.spacing.xs}px;
`

export const ItemCard = styled.View`
  background-color: ${(props) =>
    props.theme.colors['color-surface-bg-secondary'] ||
    props.theme.colors['color-neutral-200']};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.borderRadius.md}px;
  margin-horizontal: ${(props) => props.theme.spacing.lg}px;
  margin-bottom: ${(props) => props.theme.spacing.sm}px;
`

export const ItemHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xxs}px;
`
