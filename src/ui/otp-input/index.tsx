import React from 'react'
import { OtpInput as RNOtpInput } from 'react-native-otp-entry'

import { ColorKey } from '@/constants/colors'
import { getTypographyStyle } from '@/helpers/theme'
import { useTheme } from '@/services/context/theme'

import { OtpInputProps } from './typings'

const OtpInput: React.FC<OtpInputProps> = ({
  numberOfDigits = 6,
  focusColor = 'color-primary-500',
  size = 48,
  variant = 'body_lg.medium',
  spacingBottom = 'none',
  ...props
}) => {
  const { uikit } = useTheme()

  const focusColorValue = uikit?.colors?.[focusColor as ColorKey]
  const codeTextStyled = getTypographyStyle(variant)
  const marginBottom = uikit?.spacing?.[spacingBottom]

  return (
    <RNOtpInput
      numberOfDigits={numberOfDigits}
      focusColor={focusColorValue}
      theme={{
        containerStyle: {
          marginBottom,
        },
        pinCodeContainerStyle: {
          width: size,
          height: size,
          borderRadius: 4,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        pinCodeTextStyle: {
          ...codeTextStyled,
        },
        focusedPinCodeContainerStyle: {
          borderWidth: 2,
        },
      }}
      {...props}
    />
  )
}

export default OtpInput
