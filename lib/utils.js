import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Format a date object to YYYY-MM-DD string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * Check if two dates are the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} True if dates are the same day
 */
export function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

/**
 * Get mood color based on mood type
 * @param {string} mood - The mood type
 * @returns {string} CSS color class
 */
export function getMoodColor(mood) {
  const moodColors = {
    happy: "bg-yellow-400",
    excited: "bg-orange-400",
    grateful: "bg-green-400",
    relaxed: "bg-blue-400",
    neutral: "bg-gray-400",
    sad: "bg-indigo-400",
    angry: "bg-red-400",
    stressed: "bg-purple-400",
  }

  return moodColors[mood] || ""
}

/**
 * Get mood gradient based on mood type
 * @param {string} mood - The mood type
 * @returns {string} CSS gradient class
 */
export function getMoodGradient(mood) {
  const moodGradients = {
    happy: "from-yellow-400 to-yellow-300",
    excited: "from-orange-400 to-orange-300",
    grateful: "from-green-400 to-green-300",
    relaxed: "from-blue-400 to-blue-300",
    neutral: "from-gray-400 to-gray-300",
    sad: "from-indigo-400 to-indigo-300",
    angry: "from-red-400 to-red-300",
    stressed: "from-purple-400 to-purple-300",
  }

  return moodGradients[mood] || ""
}

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}