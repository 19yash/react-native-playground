import { PathProps, RectProps } from 'react-native-svg'

import { ColorKey } from '@/constants/colors'

export interface SVGIconProps {
  name: string
  color?: ColorKey
  width?: string | number
  height?: string | number
}

export type Children =
  | {
      type: 'rect'
      properties: RectProps
    }
  | {
      type: 'path'
      properties: PathProps
    }

export interface SVGInfo {
  viewBox: string
  children: Children[]
}
