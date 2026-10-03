export const getWeekDates = (baseDate: Date = new Date()) => {
  const start = new Date(baseDate)
  const day = start.getDay() // 0 (Sun) - 6 (Sat)

  // Make Monday the first day
  const diff = start.getDate() - day + (day === 0 ? -6 : 1)
  start.setDate(diff)

  return Array.from({ length: 7 }).map((_, index) => {
    const d = new Date(start)
    d.setDate(start.getDate() + index)

    return {
      key: d.toISOString(),
      date: d,
      dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
    }
  })
}
