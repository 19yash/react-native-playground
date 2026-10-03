import { ReactNode } from 'react'

import { SvgIconName } from '../svg-icon'

export interface PopupMenuOption {
  label: string
  value: string
  icon?: SvgIconName
  color?: string
  onSelect?: () => void
}

export interface PopupMenuProps {
  children: ReactNode
  options: PopupMenuOption[]
  containerWidth?: number
  containerBorderRadius?: number
  containerBackgroundColor?: string
  optionsTextColor?: string
  itemBottomBorderColor?: string
  activeBackgroundColor?: string
  onClose?: () => void
}
