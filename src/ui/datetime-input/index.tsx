import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

import Icon from '../icon'
import Text from '../text'

type PickerMode = 'date' | 'time' | 'datetime'

interface DateTimeFieldProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  value?: Date | null
  onChange: (date: Date) => void
  mode: PickerMode
  minimumDate?: Date
  maximumDate?: Date
  disabled?: boolean
  placeholder?: string
}

function DateTimeInput({
  label,
  required,
  error,
  helperText,
  value,
  onChange,
  mode,
  minimumDate,
  maximumDate,
  disabled,
  placeholder,
}: DateTimeFieldProps) {
  const [show, setShow] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [androidMode, setAndroidMode] = useState<'date' | 'time'>(
    mode === 'time' ? 'time' : 'date',
  )

  const openPicker = () => {
    if (disabled) return
    setIsFocused(true)
    setAndroidMode(mode === 'time' ? 'time' : 'date')
    setShow(true)
  }

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShow(false)
      setIsFocused(false)
      return
    }

    if (!selectedDate) return

    if (Platform.OS === 'android' && mode === 'datetime') {
      if (androidMode === 'date') {
        onChange(selectedDate)
        setAndroidMode('time')
        setShow(true)
        return
      }
    }

    onChange(selectedDate)
    setShow(false)
    setIsFocused(false)
    setAndroidMode(mode === 'time' ? 'time' : 'date')
  }

  const formatValue = () => {
    if (!value) return placeholder || 'Select'

    if (mode === 'date') return value.toLocaleDateString()

    if (mode === 'time')
      return value.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })

    return value.toLocaleString()
  }

  const hasError = !!error

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text
          i18n={label}
          variant="body_xs.regular"
          color="color-neutral-500"
          spacingBottom="xxs"
        />
      )}

      <Pressable
        onPress={openPicker}
        style={[
          styles.inputContainer,
          isFocused && styles.focused,
          hasError && styles.errorBorder,
          disabled && styles.disabled,
        ]}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {formatValue()}
        </Text>
        <Icon name="calendar" color="color-black-300" />
      </Pressable>

      <View style={styles.errorContainer}>
        {hasError ? (
          <Text size={12} lineHeight={16} color="color-danger-200">
            {error}
          </Text>
        ) : helperText ? (
          <Text size={12} lineHeight={16} color="color-danger-200">
            {helperText}
          </Text>
        ) : null}
      </View>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={
            Platform.OS === 'ios'
              ? mode === 'datetime'
                ? 'datetime'
                : mode
              : androidMode
          }
          display="default"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={handleChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
    fontWeight: '500',
  },
  required: {
    color: '#E53935',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  valueText: {
    fontSize: 16,
    color: '#111',
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  focused: {
    borderColor: '#5B8DEF',
  },
  errorBorder: {
    borderColor: '#E53935',
  },
  disabled: {
    backgroundColor: '#F5F5F5',
    opacity: 0.7,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#E53935',
  },
  helperText: {
    marginTop: 4,
    fontSize: 12,
    color: '#757575',
  },
  errorContainer: {
    minHeight: 16, // match your TextInput error height
    justifyContent: 'center',
  },
})

export default DateTimeInput

// import DateTimePicker, {
//   DateTimePickerEvent,
// } from '@react-native-community/datetimepicker'
// import React, { useState } from 'react'
// import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

// type PickerMode = 'date' | 'time' | 'datetime'

// interface DateTimeFieldProps {
//   value?: Date
//   onChange: (date: Date) => void
//   mode: PickerMode
//   minimumDate?: Date
//   maximumDate?: Date
//   disabled?: boolean
//   placeholder?: string
// }

// export function DateTimeField({
//   value,
//   onChange,
//   mode,
//   minimumDate,
//   maximumDate,
//   disabled,
//   placeholder,
// }: DateTimeFieldProps) {
//   const [show, setShow] = useState(false)
//   const [androidMode, setAndroidMode] = useState<'date' | 'time'>(
//     mode === 'time' ? 'time' : 'date',
//   )

//   const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
//     if (event.type === 'dismissed') {
//       setShow(false)
//       return
//     }

//     if (!selectedDate) return

//     // Android special handling for datetime
//     if (Platform.OS === 'android' && mode === 'datetime') {
//       if (androidMode === 'date') {
//         onChange(selectedDate)
//         setAndroidMode('time')
//         setShow(true)
//         return
//       }
//     }

//     onChange(selectedDate)
//     setShow(false)
//     setAndroidMode(mode === 'time' ? 'time' : 'date')
//   }

//   const openPicker = () => {
//     if (disabled) return
//     setAndroidMode(mode === 'time' ? 'time' : 'date')
//     setShow(true)
//   }

//   const formatValue = () => {
//     if (!value) return placeholder || 'Select'

//     if (mode === 'date') return value.toLocaleDateString()

//     if (mode === 'time')
//       return value.toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//       })

//     return value.toLocaleString()
//   }

//   return (
//     <View>
//       <Pressable
//         style={[styles.input, disabled && styles.disabled]}
//         onPress={openPicker}
//       >
//         <Text style={styles.text}>{formatValue()}</Text>
//       </Pressable>

//       {show && (
//         <DateTimePicker
//           value={value || new Date()}
//           mode={
//             Platform.OS === 'ios'
//               ? mode === 'datetime'
//                 ? 'datetime'
//                 : mode
//               : androidMode
//           }
//           display="default"
//           minimumDate={minimumDate}
//           maximumDate={maximumDate}
//           onChange={handleChange}
//         />
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     padding: 12,
//     borderRadius: 10,
//   },
//   text: {
//     fontSize: 16,
//   },
//   disabled: {
//     opacity: 0.5,
//   },
// })
