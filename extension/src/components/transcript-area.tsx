import { useRef, useEffect } from "react"

interface TranscriptAreaProps {
    lines: string[]
}

export function TranscriptArea({ lines }: TranscriptAreaProps) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [lines])

    return (
        <section aria-label="Live transcription" className="flex flex-col gap-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Transcript
            </h2>
            <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                aria-relevant="additions"
                className="h-28 overflow-y-auto rounded-lg border-2 border-border bg-secondary p-4"
            >
                {lines.length === 0 ? (
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Your spoken words will appear here...
                    </p>
                ) : (
                    <div className="flex flex-col gap-2">
                        {lines.map((line, i) => (
                            <p
                                key={i}
                                className="text-lg leading-relaxed text-foreground"
                            >
                                {line}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
