import React, { ReactNode } from 'react'

import Text from '@/ui/text'

import { StyledViewContainer } from './styles'

interface ErrorBoundaryProps {
  children: ReactNode
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // We can log if needed.
  }

  render() {
    if (this.state.hasError) {
      return (
        <StyledViewContainer>
          <Text size={16} i18n="error-boundary.description" />
        </StyledViewContainer>
      )
    }

    return this.props.children
  }
}
export default ErrorBoundary
