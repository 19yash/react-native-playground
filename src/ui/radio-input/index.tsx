import React, { FC } from 'react'

import Text from '../text'
import RadioButton from './radio-button'
import { StyledOptionsView, StyledViewContainer } from './styles'
import { Options, RadioInputProps } from './typings'

const RadioInput: FC<RadioInputProps> = ({
  i18nLabel,
  options,
  onChange,
  value,
  spacingBottom,
  error,
}) => {
  return (
    <StyledViewContainer marginBottom={spacingBottom}>
      <Text
        i18n={i18nLabel}
        variant="body_xs.regular"
        color="color-neutral-500"
        spacingBottom="xxs"
      />
      <StyledOptionsView>
        {options.map((option: Options, index: number) => (
          <RadioButton
            key={index}
            label={option.label}
            value={option.value}
            onSelect={onChange}
            selectedValue={value}
          />
        ))}
      </StyledOptionsView>
      {error && <Text size={12} i18n={error} color="color-danger-200" />}
    </StyledViewContainer>
  )
}

export default RadioInput
