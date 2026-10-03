import { ButtonProps as RNEButtonProps } from '@rneui/base'

import { ColorKey } from '@/constants/colors'
import { TypographyVariant } from '@/types/theme'

type OmittedProps = 'iconRight' | 'title'

export interface ButtonProps extends Omit<RNEButtonProps, OmittedProps> {
  i18n?: string
  color?: ColorKey
  full?: boolean
  titleVariant?: TypographyVariant
  titleColor?: ColorKey
  borderColor?: ColorKey
  buttonColor?: ColorKey
  disabledButtonColor?: ColorKey
  borderWidth?: number
  borderRadius?: number
  paddingVertical?: number
  paddingHorizontal?: number
  spacingBottom?: number
  spacingTop?: number
}
