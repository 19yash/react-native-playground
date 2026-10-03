import { styled } from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) =>
    props.theme.colors['color-surface-bg-primary'] ||
    props.theme.colors['color-neutral-100']};
`

export const Header = styled.View`
  align-items: center;
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-top: ${(props) => props.theme.spacing.xl}px;
`

export const Section = styled.View`
  padding-horizontal: ${(props) => props.theme.spacing.lg}px;
  margin-top: ${(props) => props.theme.spacing.md}px;
`

export const ThemeToggleCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.theme.colors['color-surface-bg-secondary'] ||
    props.theme.colors['color-neutral-200']};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.borderRadius.md}px;
  margin-bottom: ${(props) => props.theme.spacing.md}px;
`

export const LogoutButtonWrapper = styled.View`
  margin-top: ${(props) => props.theme.spacing.lg}px;
  padding-horizontal: ${(props) => props.theme.spacing.lg}px;
`
