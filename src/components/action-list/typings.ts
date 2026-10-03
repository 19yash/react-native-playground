import { SpacingNames } from '@/types/theme'
import { SvgIconName } from '@/ui/svg-icon'

export interface ActionListOption {
  leftTitle?: string
  leftTitleColor?: string
  rightTitle?: string
  rightTitlePlaceholder?: string
  rightIconName?: SvgIconName
  rightIconColor?: string
  navigateTo?: string
  rightSwitch?: RightSwitchProps
  activityIndicatorEnabled?: boolean
  activityIndicatorStatus?: boolean
  copyEnabled?: boolean
  flag?: string
  onPress?: () => void
}

export interface RightSwitchProps {
  value: boolean
  onValueChange: (value: boolean) => void
  disabled?: boolean
  trackColor?: {
    false?: string
    true?: string
  }
  thumbColor?: string
  ios_backgroundColor?: string
}

export interface ActionListProps {
  options: ActionListOption[]
  title?: string
  spacingTop?: SpacingNames
  spacingBottom?: SpacingNames
}

export interface ActionItemProps {
  option: ActionListOption
  onPress: (options: ActionListOption) => void
}
