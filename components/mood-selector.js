"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Smile, Heart, ThumbsUp, Coffee, Meh, Frown, AlertTriangle, Zap } from "lucide-react"

const moods = [
  {
    id: "happy",
    emoji: <Smile className="w-8 h-8" />,
    label: "Happy",
    color: "bg-yellow-200",
    hoverColor: "hover:bg-yellow-400",
  },
  {
    id: "excited",
    emoji: <Zap className="w-8 h-8" />,
    label: "Excited",
    color: "bg-orange-200",
    hoverColor: "hover:bg-orange-400",
  },
  {
    id: "grateful",
    emoji: <Heart className="w-8 h-8" />,
    label: "Grateful",
    color: "bg-green-200",
    hoverColor: "hover:bg-green-400",
  },
  {
    id: "relaxed",
    emoji: <Coffee className="w-8 h-8" />,
    label: "Relaxed",
    color: "bg-blue-200",
    hoverColor: "hover:bg-blue-400",
  },
  {
    id: "neutral",
    emoji: <Meh className="w-8 h-8" />,
    label: "Neutral",
    color: "bg-gray-200",
    hoverColor: "hover:bg-gray-400",
  },
  {
    id: "sad",
    emoji: <Frown className="w-8 h-8" />,
    label: "Sad",
    color: "bg-indigo-200",
    hoverColor: "hover:bg-indigo-400",
  },
  {
    id: "angry",
    emoji: <AlertTriangle className="w-8 h-8" />,
    label: "Angry",
    color: "bg-red-200",
    hoverColor: "hover:bg-red-400",
  },
  {
    id: "stressed",
    emoji: <ThumbsUp className="w-8 h-8 rotate-180" />,
    label: "Stressed",
    color: "bg-purple-200",
    hoverColor: "hover:bg-purple-400",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export default function MoodSelector({ onMoodSelect, selectedMood }) {
  return (
    <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={container} initial="hidden" animate="show">
      <AnimatePresence>
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            className={`mood-button ${mood.color} ${mood.hoverColor} ${selectedMood === mood.id ? "selected" : ""}`}
            onClick={() => onMoodSelect(mood.id)}
            aria-label={`Select mood: ${mood.label}`}
            variants={item}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="mb-2 text-black"
              animate={
                selectedMood === mood.id
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 },
                    }
                  : {}
              }
            >
              {mood.emoji}
            </motion.div>
            <span className="text-sm font-medium text-black">{mood.label}</span>
            {selectedMood === mood.id && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.2, 0],
                  scale: [0.8, 1.2, 1],
                }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.button>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
