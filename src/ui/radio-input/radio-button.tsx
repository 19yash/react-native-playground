import React, { FC } from 'react'

import Icon from '../icon'
import Pressable from '../pressable'
import Text from '../text'
import { StyledOptionView } from './styles'
import { RadioButtonProps } from './typings'

const RadioButton: FC<RadioButtonProps> = ({
  label,
  value,
  onSelect,
  selectedValue,
}) => {
  const isSelected = selectedValue === value
  const iconName = isSelected ? 'dotCircle' : 'circle'
  const iconColor = isSelected ? 'color-neutral-1000' : 'color-neutral-500'

  return (
    <Pressable
      onPress={() => {
        onSelect?.(value)
      }}
    >
      <StyledOptionView>
        <Icon
          name={iconName}
          color={iconColor}
          solid={selectedValue === value}
        />
        <Text i18n={label} variant="body_xs.regular" color={iconColor} />
      </StyledOptionView>
    </Pressable>
  )
}

export default RadioButton
