"use client"

import { useState, useCallback, useEffect } from "react"
import { StatusBanner, type AIState } from "@/components/status-banner"
import { MicrophoneButton } from "@/components/microphone-button"
import { WaveformVisualizer } from "@/components/waveform-visualizer"
import { TranscriptArea } from "@/components/transcript-area"
import { Plane } from "lucide-react"

const DEMO_TRANSCRIPT = [
    "I'd like to book a window seat, please.",
    "Checking available window seats on flight AA 2450...",
    "Seat 14A is available. Would you like to select it?",
]

const STATE_SEQUENCE: AIState[] = [
    "LISTENING",
    "THINKING",
    "SELECTING SEAT",
    "LISTENING",
]

export default function App() {
    const [isListening, setIsListening] = useState(false)
    const [aiState, setAiState] = useState<AIState>("IDLE")
    const [transcriptLines, setTranscriptLines] = useState<string[]>([])
    const [demoIndex, setDemoIndex] = useState(0)

    const handleToggle = useCallback(() => {
        if (isListening) {
            setIsListening(false)
            setAiState("IDLE")
            return
        }

        setIsListening(true)
        setAiState("LISTENING")
        setTranscriptLines([])
        setDemoIndex(0)
    }, [isListening])

    useEffect(() => {
        if (!isListening) return

        const interval = setInterval(() => {
            setDemoIndex((prev) => {
                const next = prev + 1

                if (next <= DEMO_TRANSCRIPT.length) {
                    setTranscriptLines(DEMO_TRANSCRIPT.slice(0, next))
                }

                if (next < STATE_SEQUENCE.length) {
                    setAiState(STATE_SEQUENCE[next])
                } else {
                    setAiState("LISTENING")
                }

                if (next >= DEMO_TRANSCRIPT.length + 1) {
                    clearInterval(interval)
                    return prev
                }

                return next
            })
        }, 2400)

        return () => clearInterval(interval)
    }, [isListening])

    return (
        <main
            className="flex min-h-screen items-center justify-center bg-background p-4"
            role="main"
        >
            <div className="w-full max-w-[400px] rounded-xl border-2 border-border bg-card shadow-none">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 border-b-2 border-border px-6 py-4">
                    <Plane
                        className="h-6 w-6 text-primary"
                        strokeWidth={2.5}
                        aria-hidden="true"
                    />
                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                        SkyVoice
                    </h1>
                    <span className="sr-only">
                        Accessible voice-powered airline seat booking
                    </span>
                </div>

                <div className="flex flex-col gap-6 py-6 px-6">
                    {/* Status Banner */}
                    <StatusBanner state={aiState} />

                    {/* Voice Interaction Area */}
                    <section
                        aria-label="Voice interaction controls"
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Waveform */}
                        <WaveformVisualizer isActive={isListening} />

                        {/* Microphone Button */}
                        <MicrophoneButton
                            isListening={isListening}
                            onToggle={handleToggle}
                        />

                        <p className="text-center text-sm font-medium text-muted-foreground">
                            {isListening
                                ? "Tap the microphone to stop"
                                : "Tap the microphone to start speaking"}
                        </p>
                    </section>

                    {/* Transcript Area */}
                    <TranscriptArea lines={transcriptLines} />
                </div>
            </div>
        </main>
    )
}
