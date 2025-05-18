"use client"

import { Smile, Heart, ThumbsUp, Coffee, Meh, Frown, AlertTriangle, Zap } from "lucide-react"

const moods = [
  { id: "happy", emoji: <Smile className="w-8 h-8" />, label: "Happy", color: "bg-yellow-100" },
  { id: "excited", emoji: <Zap className="w-8 h-8" />, label: "Excited", color: "bg-orange-100" },
  { id: "grateful", emoji: <Heart className="w-8 h-8" />, label: "Grateful", color: "bg-green-100" },
  { id: "relaxed", emoji: <Coffee className="w-8 h-8" />, label: "Relaxed", color: "bg-blue-100" },
  { id: "neutral", emoji: <Meh className="w-8 h-8" />, label: "Neutral", color: "bg-gray-100" },
  { id: "sad", emoji: <Frown className="w-8 h-8" />, label: "Sad", color: "bg-indigo-100" },
  { id: "angry", emoji: <AlertTriangle className="w-8 h-8" />, label: "Angry", color: "bg-red-100" },
  { id: "stressed", emoji: <ThumbsUp className="w-8 h-8 rotate-180" />, label: "Stressed", color: "bg-purple-100" },
]

export default function MoodSelector({ onMoodSelect, selectedMood }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {moods.map((mood) => (
        <button
          key={mood.id}
          className={`mood-button ${mood.color} ${selectedMood === mood.id ? "selected" : ""}`}
          onClick={() => onMoodSelect(mood.id)}
          aria-label={`Select mood: ${mood.label}`}
        >
          <div className="mb-2">{mood.emoji}</div>
          <span className="text-sm font-medium">{mood.label}</span>
        </button>
      ))}
    </div>
  )
}
