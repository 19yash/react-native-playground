import { OtpInputProps as RNOtpInputProps } from 'react-native-otp-entry'

import { SpacingNames, TypographyVariant } from '@/types/theme'

export interface OtpInputProps extends RNOtpInputProps {
  size?: number
  variant?: TypographyVariant
  spacingBottom?: SpacingNames
}
