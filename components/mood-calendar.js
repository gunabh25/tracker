"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { formatDate, isSameDay } from "@/lib/utils"

export default function MoodCalendar({ moods, onDateSelect, selectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Reset to current month when component mounts
  useEffect(() => {
    setCurrentMonth(new Date())
  }, [])

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
    onDateSelect(new Date())
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay()

    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Array to hold all calendar days
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const days = generateCalendarDays()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getMoodClass = (date) => {
    if (!date) return ""

    const dateKey = formatDate(date)
    const mood = moods[dateKey]

    if (!mood) return ""
    return `has-mood mood-${mood}`
  }

  return (
    <div className="calendar">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">
          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous month">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            Today
          </button>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="aspect-square flex items-center justify-center">
            {day ? (
              <button
                className={`calendar-day ${getMoodClass(day)} ${isSameDay(day, selectedDate) ? "selected" : ""}`}
                onClick={() => onDateSelect(day)}
                aria-label={day.toLocaleDateString()}
              >
                {day.getDate()}
              </button>
            ) : (
              <div className="w-10 h-10"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">Mood Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2"></div>
            <span>Happy</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-400 mr-2"></div>
            <span>Excited</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-400 mr-2"></div>
            <span>Grateful</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-400 mr-2"></div>
            <span>Relaxed</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gray-400 mr-2"></div>
            <span>Neutral</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-indigo-400 mr-2"></div>
            <span>Sad</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-400 mr-2"></div>
            <span>Angry</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-purple-400 mr-2"></div>
            <span>Stressed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
