import React from 'react'

import Icon from '@/ui/icon'
import Text from '@/ui/text'

import {
  StyledCounterButton,
  StyledCounterContainer,
  StyledCounterValue,
} from './styles'

interface CounterInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
}

const CounterInput: React.FC<CounterInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
}) => {
  const onDecrease = () => {
    if (value > min) {
      onChange(Math.max(min, value - step))
    }
  }

  const onIncrease = () => {
    if (value < max) {
      onChange(Math.min(max, value + step))
    }
  }

  return (
    <StyledCounterContainer>
      <StyledCounterButton onPress={onDecrease} disabled={value <= min}>
        <Icon name="minus" size={16} color="color-neutral-800" />
      </StyledCounterButton>

      <StyledCounterValue>
        <Text variant="body_md.medium">
          {value.toFixed(2)} {unit}
        </Text>
      </StyledCounterValue>

      <StyledCounterButton onPress={onIncrease} disabled={value >= max}>
        <Icon name="plus" size={16} color="color-neutral-800" />
      </StyledCounterButton>
    </StyledCounterContainer>
  )
}

export default CounterInput
