import { ColorKey } from '@/constants/colors'

import { IconProps } from '../icon/typings'

export type IconCircularProps = Omit<IconProps, 'color'> & {
  color?: ColorKey
  circleSize?: number
  circleColor?: ColorKey
  rightSpacing?: number
}
