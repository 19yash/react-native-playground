import { FontFamilies, FontWeights } from '@/types/theme'

export const fontFamily = {
  light: 'Manrope_300Light',
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semibold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
  extrabold: 'Manrope_800ExtraBold',
}

export const bebasFontFamily = {
  regular: 'BebasNeue_400Regular',
}

export const montserratFontFamily = {
  light: 'Montserrat_300Light',
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semiBold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
  extraBold: 'Montserrat_800ExtraBold',
}

export const fontFamilies: FontFamilies = {
  header: {
    regular: fontFamily.regular,
    medium: fontFamily.medium,
    semiBold: fontFamily.semibold,
    bold: fontFamily.bold,
  },
  body: {
    regular: fontFamily.regular,
    medium: fontFamily.medium,
    semiBold: fontFamily.semibold,
  },
}

export const fontWeights: FontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
}
