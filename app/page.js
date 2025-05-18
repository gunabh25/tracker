// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import MoodSelector from "@/components/mood-selector"
// import MoodCalendar from "@/components/mood-calendar"
// import { formatDate } from "@/lib/utils"

// export default function Home() {
//   const [moods, setMoods] = useState({})
//   const [selectedDate, setSelectedDate] = useState(new Date())
//   const [isLoaded, setIsLoaded] = useState(false)

//   // Load moods from localStorage on component mount
//   useEffect(() => {
//     const savedMoods = localStorage.getItem("moodData")
//     if (savedMoods) {
//       setMoods(JSON.parse(savedMoods))
//     }
//     setIsLoaded(true)
//   }, [])

//   // Save moods to localStorage whenever they change
//   useEffect(() => {
//     if (isLoaded) {
//       localStorage.setItem("moodData", JSON.stringify(moods))
//     }
//   }, [moods, isLoaded])

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
//     <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50">
//       <main className="container mx-auto px-4 py-12 max-w-4xl">
//         <motion.h1
//           className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           Mood Tracker
//         </motion.h1>

//         <motion.div
//           className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-purple-100"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">How are you feeling today?</h2>
//           <motion.p
//             className="text-gray-600 mb-6 flex items-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <span className="inline-block w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
//             Selected date:{" "}
//             {selectedDate.toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </motion.p>
//           <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={currentMood} />
//         </motion.div>

//         <motion.div
//           className="bg-white rounded-xl shadow-lg p-6 border border-purple-100"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//         >
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Mood History</h2>
//           <MoodCalendar moods={moods} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
//         </motion.div>
//       </main>
//     </div>
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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedMoods = localStorage.getItem("moodData")
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("moodData", JSON.stringify(moods))
    }
  }, [moods, isLoaded])

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
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.h1
          className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mood Tracker
        </motion.h1>
        <motion.div
          className="bg-zinc-900 rounded-xl shadow-lg p-6 mb-8 border border-purple-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">How are you feeling today?</h2>
          <motion.p
            className="text-gray-300 mb-6 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="inline-block w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
            Selected date:{" "}
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.p>
          <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={currentMood} />
        </motion.div>

        <motion.div
          className="bg-zinc-900 rounded-xl shadow-lg p-6 border border-purple-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Mood History</h2>
          <MoodCalendar moods={moods} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
        </motion.div>
      </main>
    </div>
  )
}
