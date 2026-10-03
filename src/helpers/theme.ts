import { get } from 'lodash'

import { typography } from '@/theme'
import { TypographyStyle, TypographyVariant } from '@/types/theme'

export const getTypographyStyle = (
  variant: TypographyVariant,
): TypographyStyle => {
  return get(typography, variant, typography.body_md.medium)
}
