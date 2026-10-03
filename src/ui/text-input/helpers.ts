import { TextInputBorderVariant } from './typings'

export const getBorderStyle = (
  variant: TextInputBorderVariant,
  width?: number,
) => {
  switch (variant) {
    case 'bottomOnly':
      return {
        borderWidth: 0,
        borderBottomWidth: width || 0,
      }

    case 'none':
      return {
        borderWidth: 0,
      }

    default:
      return {
        borderWidth: width || 0,
        borderBottomWidth: width || 0,
      }
  }
}
