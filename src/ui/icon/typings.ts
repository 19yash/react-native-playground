import { SpacingNames } from '@/types/theme'

import { SvgIconName } from '../svg-icon'

export interface IconProps {
  name: SvgIconName
  color?: string
  onPress?: () => void
  disabled?: boolean
  spacingLeft?: SpacingNames
  spacingRight?: SpacingNames
  spacingTop?: SpacingNames
  spacingBottom?: SpacingNames

  /**
   * `size` sets the icon dimensions (both width and height).
   */
  size?: number

  /**
   * `height` is used to override the icon height independently.
   */
  height?: string | number

  /**
   * `width` is used to override the icon width independently.
   */
  width?: string | number

  /**
   * @deprecated No longer used. All icons are now custom SVGs.
   * Kept for backward compatibility with legacy consumers.
   */
  type?: string

  /**
   * @deprecated No longer used. All icons are now custom SVGs.
   * Kept for backward compatibility with legacy consumers.
   */
  solid?: boolean

  /**
   * @deprecated No longer used.
   * Kept for backward compatibility with legacy consumers.
   */
  isGeneric?: boolean

  /**
   * @deprecated No longer used.
   * Kept for backward compatibility with legacy consumers.
   */
  enableRotatingAnimation?: boolean
}

export interface RotatingIconProps {
  name: SvgIconName
  color?: string
  type?: string
  height?: string | number
  width?: string | number
}
