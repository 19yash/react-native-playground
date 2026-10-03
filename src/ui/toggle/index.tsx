import React from 'react'
import { Switch, SwitchProps } from 'react-native'
import { useTheme } from 'styled-components/native'

export interface ToggleProps extends Omit<
  SwitchProps,
  'value' | 'onValueChange' | 'onChange'
> {
  value: boolean
  onChange: (value: boolean) => void
}

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onChange,
  ...props
}) => {
  const theme = useTheme()
  const activeColor = (theme.colors['color-primary-300'] as string) || '#007AFF'
  const inactiveColor =
    (theme.colors['color-neutral-300'] as string) || '#E5E5EA'

  return (
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: inactiveColor, true: activeColor }}
      thumbColor="#ffffff"
      ios_backgroundColor={inactiveColor}
      {...props}
    />
  )
}

export default Toggle
