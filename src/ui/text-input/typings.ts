import { Input, InputProps } from '@rneui/base'
import { TextInput, TextStyle } from 'react-native'

import { SpacingNames, TypographyVariant } from '@/types/theme'

type OmittedInputProps = 'label' | 'placeholder' | 'errorMessage'

export type TextInputBorderVariant = 'bottomOnly' | 'whole' | 'none'

export interface TextInputProps extends Omit<InputProps, OmittedInputProps> {
  ref?: React.RefObject<TextInput & Input>
  i18nLabel?: string
  i18nPlaceholder?: string
  i18nErrorMessage?: string
  marginBottom?: SpacingNames
  rightIconColor?: string
  showAlert?: boolean
  isSecureText?: boolean
  labelTextAlign?: TextStyle['textAlign']
  variant?: TypographyVariant
  labelVariant?: TypographyVariant
  errorVariant?: TypographyVariant
  borderVariant?: TextInputBorderVariant
  backgroundColor?: string
  borderWidth?: number
  borderRadius?: number
  paddingVertical?: number
  paddingHorizontal?: number
}
