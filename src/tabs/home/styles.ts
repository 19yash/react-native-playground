import { styled } from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) =>
    props.theme.colors['color-surface-bg-primary'] ||
    props.theme.colors['color-neutral-100']};
`

export const Header = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
  padding-bottom: ${(props) => props.theme.spacing.sm}px;
`

export const CardRow = styled.View`
  flex-direction: row;
  gap: ${(props) => props.theme.spacing.sm}px;
  margin-top: ${(props) => props.theme.spacing.md}px;
`

export const StatCard = styled.View`
  flex: 1;
  background-color: ${(props) =>
    props.theme.colors['color-surface-bg-secondary'] ||
    props.theme.colors['color-neutral-200']};
  padding: ${(props) => props.theme.spacing.md}px;
  border-radius: ${(props) => props.theme.borderRadius.md}px;
`

export const Section = styled.View`
  padding: ${(props) => props.theme.spacing.lg}px;
`

export const ActionsContainer = styled.View`
  gap: ${(props) => props.theme.spacing.sm}px;
  margin-top: ${(props) => props.theme.spacing.md}px;
`
