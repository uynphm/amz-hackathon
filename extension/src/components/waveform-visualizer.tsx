import { motion } from "framer-motion"

interface WaveformVisualizerProps {
    isActive: boolean
}

const BAR_COUNT = 24

export function WaveformVisualizer({ isActive }: WaveformVisualizerProps) {
    return (
        <div
            role="img"
            aria-label={
                isActive
                    ? "Waveform visualizer: voice input detected"
                    : "Waveform visualizer: no voice input"
            }
            className="flex h-20 items-end justify-center gap-1"
        >
            {Array.from({ length: BAR_COUNT }).map((_, i) => {
                const centerDistance = Math.abs(i - BAR_COUNT / 2) / (BAR_COUNT / 2)
                const maxHeight = 1 - centerDistance * 0.6
                const idleHeight = 4

                return (
                    <motion.div
                        key={i}
                        className="w-1.5 rounded-full bg-primary"
                        animate={
                            isActive
                                ? {
                                    height: [
                                        idleHeight,
                                        maxHeight * 72 + 8,
                                        idleHeight + 8,
                                        maxHeight * 56 + 8,
                                        idleHeight,
                                    ],
                                }
                                : { height: idleHeight }
                        }
                        transition={
                            isActive
                                ? {
                                    duration: 0.8 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    delay: i * 0.04,
                                    ease: "easeInOut",
                                }
                                : { duration: 0.4, ease: "easeOut" }
                        }
                        style={{ height: idleHeight }}
                        aria-hidden="true"
                    />
                )
            })}
        </div>
    )
}
