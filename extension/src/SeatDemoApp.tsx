import { useState, useCallback } from "react"
import { SeatMap } from "@/components/seat-map"
import { initialSeats } from "@/mock/seats"
import type { Seat, SeatAction } from "@/types/seat"
import { Plane, RotateCcw, Sparkles, X } from "lucide-react"

function applySeatAction(seats: Seat[], action: SeatAction): Seat[] {
    if (action.type === "SELECT_SEAT") {
        return seats.map((seat) => {
            if (seat.status === "occupied") return seat

            if (seat.id === action.seatId) {
                return {
                    ...seat,
                    status: seat.status === "selected" ? "available" : "selected",
                }
            }

            if (seat.status === "selected") {
                return { ...seat, status: "available" }
            }

            return seat
        })
    }

    if (action.type === "CLEAR_SELECTION") {
        return seats.map((seat) =>
            seat.status === "selected" || seat.status === "recommended"
                ? { ...seat, status: "available" }
                : seat,
        )
    }

    return seats.map((seat) => {
        if (seat.status === "occupied" || seat.status === "selected") return seat

        if (action.seatIds.includes(seat.id)) {
            return { ...seat, status: "recommended" }
        }

        return seat.status === "recommended"
            ? { ...seat, status: "available" }
            : seat
    })
}

export default function SeatDemoApp() {
    const [seats, setSeats] = useState<Seat[]>(initialSeats)

    const selectedSeat = seats.find((s) => s.status === "selected")

    const handleSeatClick = useCallback((seatId: string) => {
        setSeats((prev) => applySeatAction(prev, { type: "SELECT_SEAT", seatId }))
    }, [])

    const highlightWindows = useCallback(() => {
        const windowIds = initialSeats
            .filter((s) => s.isWindow && s.status !== "occupied")
            .map((s) => s.id)
        setSeats((prev) =>
            applySeatAction(prev, { type: "HIGHLIGHT_RECOMMENDED", seatIds: windowIds }),
        )
    }, [])

    const clearAll = useCallback(() => {
        setSeats((prev) => applySeatAction(prev, { type: "CLEAR_SELECTION" }))
    }, [])

    const resetMap = useCallback(() => {
        setSeats(initialSeats)
    }, [])

    return (
        <main className="flex min-h-screen items-center justify-center bg-background p-6">
            <div className="w-full max-w-lg rounded-2xl border-2 border-border bg-card">
                {/* Header */}
                <div className="flex items-center justify-center gap-3 border-b-2 border-border px-6 py-5">
                    <Plane className="h-6 w-6 text-primary" strokeWidth={2.5} aria-hidden="true" />
                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                        Seat Highlight Demo
                    </h1>
                </div>

                <div className="flex flex-col gap-5 p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        Click any seat to select it. Use the buttons below to simulate
                        AI-driven actions like highlighting recommended seats.
                    </p>

                    {selectedSeat && (
                        <div className="flex items-center justify-between rounded-lg border-2 border-primary bg-primary/10 px-4 py-2.5">
                            <span className="text-sm font-bold text-primary">
                                Selected: Seat {selectedSeat.label}
                                {selectedSeat.isWindow ? " (Window)" : ""}
                                {selectedSeat.isAisle ? " (Aisle)" : ""}
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={highlightWindows}
                            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-primary bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Recommend
                        </button>
                        <button
                            type="button"
                            onClick={clearAll}
                            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-border bg-secondary px-3 py-2 text-xs font-semibold text-foreground hover:border-primary"
                        >
                            <X className="h-3.5 w-3.5" />
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={resetMap}
                            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-border bg-secondary px-3 py-2 text-xs font-semibold text-foreground hover:border-primary"
                        >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Reset
                        </button>
                    </div>

                    <SeatMap seats={seats} onSeatClick={handleSeatClick} />
                </div>
            </div>
        </main>
    )
}
