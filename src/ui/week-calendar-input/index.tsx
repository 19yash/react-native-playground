import React, { FC, useMemo, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { styled } from 'styled-components/native'

import { getWeekDates } from './helpers'

const Container = styled.View`
  padding: 12px 16px;
`

const DayItem = styled(TouchableOpacity)<{ selected: boolean }>`
  width: 60px;
  height: 90px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background-color: ${({ selected }) => (selected ? '#2E2E2E' : 'transparent')};
`

const DayText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#FFF' : '#9E9E9E')};
`

const DateText = styled.Text<{ selected: boolean }>`
  font-size: 22px;
  font-weight: 600;
  margin-top: 4px;
  color: ${({ selected }) => (selected ? '#FFF' : '#9E9E9E')};
`

const WeekCalendar: FC<{
  onChange: (date: Date) => void
}> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const weekData = useMemo(() => getWeekDates(selectedDate), [selectedDate])

  const handleOnChange = (date: Date) => {
    setSelectedDate(date)
    onChange?.(date)
  }

  return (
    <Container>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={weekData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          const isSelected =
            item.date.toDateString() === selectedDate.toDateString()

          return (
            <DayItem
              selected={isSelected}
              onPress={() => handleOnChange(item.date)}
            >
              <DayText selected={isSelected}>{item.dayLabel}</DayText>
              <DateText selected={isSelected}>{item.dayNumber}</DateText>
            </DayItem>
          )
        }}
      />
    </Container>
  )
}

export default WeekCalendar
