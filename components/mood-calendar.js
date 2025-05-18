"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { formatDate, isSameDay } from "@/lib/utils"

export default function MoodCalendar({ moods, onDateSelect, selectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [direction, setDirection] = useState(0)

  // Reset to current month when component mounts
  useEffect(() => {
    setCurrentMonth(new Date())
  }, [])

  const prevMonth = () => {
    setDirection(-1)
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setDirection(1)
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setDirection(0)
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

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  return (
    <div className="calendar">
      <div className="flex justify-between items-center mb-6">
        <motion.h3
          className="text-lg font-medium flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Calendar className="w-5 h-5 mr-2 text-purple-500" />
          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </motion.h3>
        <div className="flex space-x-2">
          <motion.button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-purple-100 transition-colors"
            aria-label="Previous month"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-purple-600" />
          </motion.button>
          <motion.button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Today
          </motion.button>
          <motion.button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-purple-100 transition-colors"
            aria-label="Next month"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 text-purple-600" />
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentMonth.getMonth() + "-" + currentMonth.getFullYear()}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center">
                {day ? (
                  <motion.button
                    className={`calendar-day ${getMoodClass(day)} ${isSameDay(day, selectedDate) ? "selected" : ""}`}
                    onClick={() => onDateSelect(day)}
                    aria-label={day.toLocaleDateString()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                  >
                    {day.getDate()}
                  </motion.button>
                ) : (
                  <div className="w-10 h-10"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="mt-8 p-4 bg-rose-100 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-sm font-medium mb-3 text-purple-700">Mood Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {moods && Object.keys(moods).length > 0 ? (
            <>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-400 mr-2 shadow-sm"></div>
                <span className="text-black">Happy</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-orange-400 mr-2 shadow-sm"></div>
                <span className="text-black">Excited</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-400 mr-2 shadow-sm"></div>
                <span className="text-black">Grateful</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-blue-400 mr-2 shadow-sm"></div>
                <span className="text-black">Relaxed</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-gray-400 mr-2 shadow-sm"></div>
                <span className="text-black">Neutral</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-indigo-400 mr-2 shadow-sm"></div>
                <span className="text-black">Sad</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-red-400 mr-2 shadow-sm"></div>
                <span className="text-black">Angry</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-purple-400 mr-2 shadow-sm"></div>
                <span className="text-black">Stressed</span>
              </div>
            </>
          ) : (
            <motion.p
              className="col-span-4 text-gray-500 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              No moods recorded yet. Select a date and mood to get started!
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
