import BottomSheet from '@gorhom/bottom-sheet/'
import React from 'react'
import { SharedValue } from 'react-native-reanimated'

export interface BottomDrawerProps {
  sheetRef?: React.RefObject<BottomSheet>
  snapPoints?: (string | number)[]
  index?: number
  children?: React.ReactNode
  onChange?: (index: number) => void
  header?: React.ReactNode
  dockComponent?: React.ReactNode
  footer?: any
  showVerticalScroll?: boolean
  marginBottom?: number
  backgroundColor?: string
  minHeaderHeight?: number
  showHandle?: boolean
}

export interface DockProps {
  animatedPosition: SharedValue<number>
  animatedIndex: SharedValue<number>
  height?: number
  children?: React.ReactNode
}
