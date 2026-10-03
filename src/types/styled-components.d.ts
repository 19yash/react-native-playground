import 'styled-components/native'

import { ColorKey } from '../constants/colors'
import { Spacing } from './theme'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: Record<ColorKey, string>
    spacing: Spacing
    borderRadius: Spacing
    utils: {
      shadow: (
        xOffset: number,
        yOffset: number,
        color?: string,
        opacity?: number,
        radius?: number,
        elevation?: number,
      ) => (props: { theme: DefaultTheme }) => {
        shadowColor?: string
        shadowOffset?: { width: number; height: number }
        shadowOpacity?: number
        shadowRadius?: number
        elevation?: number
      }
    }
  }
}
