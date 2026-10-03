import { PressableProps } from 'react-native'

export interface PressableWrapperProps extends PressableProps {
  children: React.ReactNode
  opacityOnPress?: number
  scaleOnPress?: number
}
