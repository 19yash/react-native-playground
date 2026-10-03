import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

type DateInput = string | number | Date | dayjs.Dayjs

type DateFormat =
  | 'YYYY-MM-DD'
  | 'DD/MM/YYYY'
  | 'MMM D, YYYY'
  | 'YYYY-MM-DD HH:mm:ss'
  | 'HH:mm'
  | 'DD MMM YY, HH:mm'
  | 'MMM D'

export const dateUtils = {
  parse: (input?: DateInput): dayjs.Dayjs => {
    return input ? dayjs(input) : dayjs()
  },

  format: (input?: DateInput, format: DateFormat = 'YYYY-MM-DD'): string => {
    return dateUtils.parse(input).format(format)
  },

  toISOString: (input?: DateInput): string => {
    return dateUtils.parse(input).toISOString()
  },

  fromNow: (input?: DateInput): string => {
    return dateUtils.parse(input).fromNow()
  },

  isBefore: (a: DateInput, b: DateInput): boolean => {
    return dateUtils.parse(a).isBefore(dateUtils.parse(b))
  },

  isAfter: (a: DateInput, b: DateInput): boolean => {
    return dateUtils.parse(a).isAfter(dateUtils.parse(b))
  },

  add: (
    input: DateInput,
    amount: number,
    unit: dayjs.ManipulateType,
  ): dayjs.Dayjs => {
    return dateUtils.parse(input).add(amount, unit)
  },

  subtract: (
    input: DateInput,
    amount: number,
    unit: dayjs.ManipulateType,
  ): dayjs.Dayjs => {
    return dateUtils.parse(input).subtract(amount, unit)
  },

  startOf: (input: DateInput, unit: dayjs.OpUnitType): dayjs.Dayjs => {
    return dateUtils.parse(input).startOf(unit)
  },

  endOf: (input: DateInput, unit: dayjs.OpUnitType): dayjs.Dayjs => {
    return dateUtils.parse(input).endOf(unit)
  },

  diff: (
    a: DateInput,
    b: DateInput,
    unit: dayjs.QUnitType | dayjs.OpUnitType = 'millisecond',
    float = false,
  ): number => {
    return dateUtils.parse(a).diff(dateUtils.parse(b), unit, float)
  },

  toUTC: (input?: DateInput): dayjs.Dayjs => {
    return dateUtils.parse(input).utc()
  },

  fromUTC: (input: DateInput): dayjs.Dayjs => {
    return dayjs.utc(input).local()
  },

  inTimezone: (input: DateInput, tz: string): dayjs.Dayjs => {
    return dateUtils.parse(input).tz(tz)
  },
}

export function buildApiDateTime(date: Date, time: Date): string {
  if (!date || !time) {
    return 'N/A'
  }

  const merged = new Date(date)
  const timeFormatted = new Date(time)

  merged.setHours(timeFormatted.getHours(), timeFormatted.getMinutes(), 0, 0)

  return merged.toISOString().replace('.000', '')
}
