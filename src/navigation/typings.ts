import { SvgIconName, SvgIconProps } from '@/ui/svg-icon'

export interface TabProps {
  name: string
  icon: SvgIconName
  active: boolean
  label: string
  size?: number
  svgIconColor?: string
  svgProps?: SvgIconProps
  solid?: boolean
  showLabel?: boolean
}
