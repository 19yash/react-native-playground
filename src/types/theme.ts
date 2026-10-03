import { TextStyle } from 'react-native'

import { ColorKey } from '../constants/colors'

export interface TypographyStyle {
  fontSize: number
  lineHeight: number
  fontWeight: TextStyle['fontWeight']
  fontFamily: string
  letterSpacing?: number
}

export interface BodyVariantByWeight {
  regular: TypographyStyle
  medium: TypographyStyle
  semiBold: TypographyStyle
}
export interface Typography {
  // Headings with multiple weight variants
  h1: {
    bold: TypographyStyle
    semiBold: TypographyStyle
    medium: TypographyStyle
  }
  h2: {
    bold: TypographyStyle
    semiBold: TypographyStyle
    medium: TypographyStyle
  }
  h3: {
    semiBold: TypographyStyle
    medium: TypographyStyle
    regular: TypographyStyle
  }
  h4: {
    semiBold: TypographyStyle
    medium: TypographyStyle
    regular: TypographyStyle
  }

  // Body text variants
  body_xl: BodyVariantByWeight
  body_lg: BodyVariantByWeight
  body_md: BodyVariantByWeight
  body_sm: BodyVariantByWeight
  body_xs: BodyVariantByWeight
  body_xxs: BodyVariantByWeight

  // Bebas Neue variants.
  bebas_display_xxl: { regular: TypographyStyle }
  bebas_display_xl: { regular: TypographyStyle }
  bebas_display_lg: { regular: TypographyStyle }
  bebas_display_md: { regular: TypographyStyle }
  bebas_display_sm: { regular: TypographyStyle }
  bebas_h1: { regular: TypographyStyle }
  bebas_h2: { regular: TypographyStyle }
  bebas_h3: { regular: TypographyStyle }
  bebas_h4: { regular: TypographyStyle }
  bebas_h5: { regular: TypographyStyle }
  bebas_h6: { regular: TypographyStyle }

  // Montserrat variants.
  montserrat_body_xl: BodyVariantByWeight
  montserrat_body_lg: BodyVariantByWeight
  montserrat_body_md: BodyVariantByWeight
  montserrat_body_sm: BodyVariantByWeight
  montserrat_body_xs: BodyVariantByWeight

  montserrat_button_lg: { bold: TypographyStyle }
  montserrat_button_md: { bold: TypographyStyle }
  montserrat_button_sm: { bold: TypographyStyle }

  montserrat_link_lg: { semiBold: TypographyStyle }
  montserrat_link_md: { semiBold: TypographyStyle }
  montserrat_link_sm: { semiBold: TypographyStyle }

  montserrat_input: { regular: TypographyStyle }
  montserrat_placeholder: { light: TypographyStyle }

  montserrat_label_lg: { semiBold: TypographyStyle }
  montserrat_label_md: { semiBold: TypographyStyle }
  montserrat_label_sm: { semiBold: TypographyStyle }

  montserrat_overline_lg: { extraBold: TypographyStyle }
  montserrat_overline_md: { extraBold: TypographyStyle }

  montserrat_caption: {
    regular: TypographyStyle
    bold: TypographyStyle
  }
}

export interface HeaderFontFamilyByWeight {
  regular: string
  medium: string
  bold: string
  semiBold: string
}

export interface BodyFontFamilyByWeight {
  regular: string
  medium: string
  semiBold: string
}

// Font families interface
export interface FontFamilies {
  header: HeaderFontFamilyByWeight
  body: BodyFontFamilyByWeight
}

export interface FontWeights {
  light: '300'
  regular: '400'
  medium: '500'
  semiBold: '600'
  bold: '700'
  extraBold: '800'
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

export type HeadingWeight = 'bold' | 'semiBold' | 'medium' | 'regular'

export type BodyLevel =
  | 'body_xl'
  | 'body_lg'
  | 'body_md'
  | 'body_sm'
  | 'body_xs'
  | 'body_xxs'

export type BodyWeight = 'regular' | 'medium' | 'semiBold'

// ── Bebas Neue levels ──
export type BebasDisplayLevel =
  | 'bebas_display_xxl'
  | 'bebas_display_xl'
  | 'bebas_display_lg'
  | 'bebas_display_md'
  | 'bebas_display_sm'

export type BebasHeadingLevel =
  | 'bebas_h1'
  | 'bebas_h2'
  | 'bebas_h3'
  | 'bebas_h4'
  | 'bebas_h5'
  | 'bebas_h6'

export type BebasWeight = 'regular'

// ── Montserrat levels ──
export type MontserratBodyLevel =
  | 'montserrat_body_xl'
  | 'montserrat_body_lg'
  | 'montserrat_body_md'
  | 'montserrat_body_sm'
  | 'montserrat_body_xs'

export type MontserratButtonLevel =
  | 'montserrat_button_lg'
  | 'montserrat_button_md'
  | 'montserrat_button_sm'

export type MontserratLinkLevel =
  | 'montserrat_link_lg'
  | 'montserrat_link_md'
  | 'montserrat_link_sm'

export type MontserratInputLevel = 'montserrat_input'
export type MontserratPlaceholderLevel = 'montserrat_placeholder'

export type MontserratLabelLevel =
  | 'montserrat_label_lg'
  | 'montserrat_label_md'
  | 'montserrat_label_sm'

export type MontserratOverlineLevel =
  | 'montserrat_overline_lg'
  | 'montserrat_overline_md'

export type MontserratCaptionLevel = 'montserrat_caption'

// ── Montserrat weights ──
export type MontserratBodyWeight = 'regular' | 'medium' | 'semiBold'
export type MontserratButtonWeight = 'bold'
export type MontserratLinkWeight = 'semiBold'
export type MontserratInputWeight = 'regular'
export type MontserratPlaceholderWeight = 'light'
export type MontserratLabelWeight = 'semiBold'
export type MontserratOverlineWeight = 'extraBold'
export type MontserratCaptionWeight = 'regular' | 'bold'

// Union type for all typography variants
export type TypographyVariant =
  | `${HeadingLevel}.${HeadingWeight}`
  | `${BodyLevel}.${BodyWeight}`
  | `${BebasDisplayLevel}.${BebasWeight}`
  | `${BebasHeadingLevel}.${BebasWeight}`
  | `${MontserratBodyLevel}.${MontserratBodyWeight}`
  | `${MontserratButtonLevel}.${MontserratButtonWeight}`
  | `${MontserratLinkLevel}.${MontserratLinkWeight}`
  | `${MontserratInputLevel}.${MontserratInputWeight}`
  | `${MontserratPlaceholderLevel}.${MontserratPlaceholderWeight}`
  | `${MontserratLabelLevel}.${MontserratLabelWeight}`
  | `${MontserratOverlineLevel}.${MontserratOverlineWeight}`
  | `${MontserratCaptionLevel}.${MontserratCaptionWeight}`

export type TextAlignType = TextStyle['textAlign']

export interface Spacing {
  /**
   * 0px
   */
  none: number
  /**
   * 2px
   */
  xxxs: number
  /**
   * 4px
   */
  xxs: number
  /**
   * 8px
   */
  xs: number
  /**
   * 12px
   */
  sm: number
  /**
   * 16px
   */
  md: number
  /**
   * 24px
   */
  lg: number
  /**
   * 32px
   */
  xl: number
  /**
   * 40px
   */
  xxl: number
  /**
   * 48px
   */
  xxxl: number
}

export type SpacingNames = keyof Spacing

export type ColorNames = ColorKey
