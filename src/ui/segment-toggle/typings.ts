type SegmentOption<T extends string> = {
  label: string
  value: T
}

export interface SegmentedToggleProps<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  disabled?: boolean
}
