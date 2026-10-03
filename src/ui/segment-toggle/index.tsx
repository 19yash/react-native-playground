import React, { useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, Pressable, Text } from 'react-native'

import { ColorKey } from '@/constants/colors'

import Icon from '../icon'
import { SvgIconName } from '../svg-icon'
import { StyledItemView, StyledWrapperView, styles } from './styles'

type SegmentOption<T extends string> = {
  label: string
  value: T
  icon?: SvgIconName
}

interface SegmentedToggleProps<T extends string> {
  options: SegmentOption<T>[]
  value: T
  onChange: (value: T) => void
  disabled?: boolean
  backgroundColor?: ColorKey
}

export function SegmentedToggle<T extends string>({
  options,
  value,
  onChange,
  disabled,
  backgroundColor = 'color-neutral-100',
}: SegmentedToggleProps<T>) {
  const translateX = useRef(new Animated.Value(0)).current
  const segmentWidth = useRef(0)
  const [isLayoutReady, setIsLayoutReady] = useState(false)

  const selectedIndex = options.findIndex((o) => o.value === value)

  useEffect(() => {
    if (!isLayoutReady) return

    Animated.spring(translateX, {
      toValue: selectedIndex * segmentWidth.current,
      useNativeDriver: true,
      stiffness: 180,
      damping: 20,
      mass: 0.6,
    }).start()
  }, [selectedIndex, isLayoutReady])

  const onLayout = (e: LayoutChangeEvent) => {
    const width = (e.nativeEvent.layout.width - 8) / options.length

    if (segmentWidth.current === width) return

    segmentWidth.current = width

    translateX.setValue(selectedIndex * width)
    setIsLayoutReady(true)
  }

  return (
    <StyledWrapperView
      backgroundColor={backgroundColor as ColorKey}
      onLayout={onLayout}
    >
      {isLayoutReady && (
        <Animated.View
          style={[
            styles.activeBackground,
            {
              width: segmentWidth.current,
              transform: [{ translateX }],
            },
          ]}
        />
      )}

      {options.map((option) => {
        const isActive = option.value === value

        return (
          <Pressable
            key={option.value}
            style={styles.segment}
            disabled={disabled}
            onPress={() => onChange(option.value)}
          >
            <StyledItemView>
              {isActive && option?.icon && (
                <Icon name={option.icon} color="color-neutral-100" />
              )}
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {option.label}
              </Text>
            </StyledItemView>
          </Pressable>
        )
      })}
    </StyledWrapperView>
  )
}
