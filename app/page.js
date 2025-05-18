// "use client"

// import { useState, useEffect } from "react"
// import MoodSelector from "@/components/mood-selector"
// import MoodCalendar from "@/components/mood-calendar"
// import { formatDate } from "@/lib/utils"

// export default function Home() {
//   const [moods, setMoods] = useState({})
//   const [selectedDate, setSelectedDate] = useState(new Date())

//   // Load moods from localStorage on component mount
//   useEffect(() => {
//     const savedMoods = localStorage.getItem("moodData")
//     if (savedMoods) {
//       setMoods(JSON.parse(savedMoods))
//     }
//   }, [])

//   // Save moods to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("moodData", JSON.stringify(moods))
//   }, [moods])

//   const handleMoodSelect = (mood) => {
//     const dateKey = formatDate(selectedDate)
//     setMoods((prevMoods) => ({
//       ...prevMoods,
//       [dateKey]: mood,
//     }))
//   }

//   const handleDateSelect = (date) => {
//     setSelectedDate(date)
//   }

//   const currentDateKey = formatDate(selectedDate)
//   const currentMood = moods[currentDateKey] || null

//   return (
//     <main className="container mx-auto px-4 py-8 max-w-4xl">
//       <h1 className="text-3xl font-bold text-center mb-8">Mood Tracker</h1>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
//         <p className="text-gray-600 mb-6">Selected date: {selectedDate.toLocaleDateString()}</p>
//         <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={currentMood} />
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">Your Mood History</h2>
//         <MoodCalendar moods={moods} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
//       </div>
//     </main>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MoodSelector from "@/components/mood-selector"
import MoodCalendar from "@/components/mood-calendar"
import { formatDate } from "@/lib/utils"

export default function Home() {
  const [moods, setMoods] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const savedMoods = localStorage.getItem("moodData")
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("moodData", JSON.stringify(moods))
  }, [moods])

  const handleMoodSelect = (mood) => {
    const dateKey = formatDate(selectedDate)
    setMoods((prevMoods) => ({
      ...prevMoods,
      [dateKey]: mood,
    }))
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const currentDateKey = formatDate(selectedDate)
  const currentMood = moods[currentDateKey] || null

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.h1
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Mood Tracker
      </motion.h1>

      <motion.div
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        <p className="text-gray-600 mb-6">Selected date: {selectedDate.toLocaleDateString()}</p>
        <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={currentMood} />
      </motion.div>

      <motion.div
        className="bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">Your Mood History</h2>
        <MoodCalendar
          moods={moods}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />
      </motion.div>
    </main>
  )
}

