"use client"

import { Mic, MicOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MicrophoneButtonProps {
  isListening: boolean
  onToggle: () => void
}

export function MicrophoneButton({
  isListening,
  onToggle,
}: MicrophoneButtonProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Ring Ripple Animation */}
      <AnimatePresence>
        {isListening && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2 border-primary"
                initial={{ width: 80, height: 80, opacity: 0.6 }}
                animate={{
                  width: [80, 160],
                  height: [80, 160],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeOut",
                }}
                aria-hidden="true"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Microphone Button */}
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.92 }}
        className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${
          isListening
            ? "border-primary bg-primary text-primary-foreground"
            : "border-foreground bg-secondary text-foreground hover:border-primary hover:text-primary"
        }`}
        aria-label={
          isListening
            ? "Microphone is on. Press to stop listening."
            : "Microphone is off. Press to start listening."
        }
        aria-pressed={isListening}
        role="button"
      >
        {isListening ? (
          <Mic className="h-9 w-9" strokeWidth={2.5} />
        ) : (
          <MicOff className="h-9 w-9" strokeWidth={2.5} />
        )}
      </motion.button>
    </div>
  )
}
