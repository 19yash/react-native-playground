import { SpacingNames } from '@/types/theme'

export interface Options {
  label: string
  value: string
}

export interface RadioButtonProps {
  label: string
  onSelect: Function
  value?: string
  selectedValue?: string
}

export interface RadioInputProps {
  i18nLabel: string
  options: Options[]
  onChange: (value: string) => void
  value?: string
  spacingBottom?: SpacingNames
  error?: string
}
