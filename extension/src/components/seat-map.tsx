import { cn } from "@/lib/utils"
import type { Seat } from "@/types/seat"

interface SeatMapProps {
    seats: Seat[]
    onSeatClick: (seatId: string) => void
}

const COL_HEADERS = ["A", "B", "C", "", "D", "E", "F"]

function getSeatClass(status: Seat["status"]) {
    switch (status) {
        case "selected":
            return "border-primary bg-primary text-primary-foreground scale-105"
        case "recommended":
            return "border-primary bg-transparent text-primary ring-2 ring-primary/50 animate-pulse"
        case "occupied":
            return "border-border bg-muted/40 text-muted-foreground/50 cursor-not-allowed"
        default:
            return "border-border bg-secondary text-foreground hover:border-primary hover:text-primary"
    }
}

export function SeatMap({ seats, onSeatClick }: SeatMapProps) {
    const rows = [...new Set(seats.map((s) => s.row))].sort((a, b) => a - b)

    return (
        <section aria-label="Aircraft seat map" className="flex flex-col gap-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Seat Map — Flight AA 2450
            </h2>

            <div className="rounded-xl border-2 border-border bg-card p-4">
                {/* Column headers */}
                <div className="mb-2 grid grid-cols-[2.5rem_repeat(3,1fr)_1rem_repeat(3,1fr)] gap-1.5 text-center text-xs font-semibold text-muted-foreground">
                    <span />
                    {COL_HEADERS.map((h, i) =>
                        h === "" ? (
                            <span key={i} />
                        ) : (
                            <span key={i}>{h}</span>
                        ),
                    )}
                </div>

                {/* Seat rows */}
                <div className="flex flex-col gap-1.5">
                    {rows.map((row) => {
                        const left = seats.filter((s) => s.row === row && ["A", "B", "C"].includes(s.col))
                        const right = seats.filter((s) => s.row === row && ["D", "E", "F"].includes(s.col))

                        return (
                            <div
                                key={row}
                                className="grid grid-cols-[2.5rem_repeat(3,1fr)_1rem_repeat(3,1fr)] gap-1.5"
                            >
                                <span className="flex items-center justify-center text-xs font-medium text-muted-foreground">
                                    {row}
                                </span>

                                {left.map((seat) => (
                                    <SeatButton key={seat.id} seat={seat} onClick={onSeatClick} />
                                ))}

                                {/* Aisle gap */}
                                <span />

                                {right.map((seat) => (
                                    <SeatButton key={seat.id} seat={seat} onClick={onSeatClick} />
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                <LegendItem className="border-border bg-secondary" label="Available" />
                <LegendItem className="border-primary bg-primary" label="Selected" />
                <LegendItem className="border-primary bg-transparent ring-1 ring-primary/50" label="Recommended" />
                <LegendItem className="border-border bg-muted/40 opacity-50" label="Occupied" />
            </div>
        </section>
    )
}

function SeatButton({ seat, onClick }: { seat: Seat; onClick: (id: string) => void }) {
    const isDisabled = seat.status === "occupied"

    return (
        <button
            type="button"
            disabled={isDisabled}
            onClick={() => onClick(seat.id)}
            className={cn(
                "flex h-10 items-center justify-center rounded-lg border-2 text-xs font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                getSeatClass(seat.status),
            )}
            aria-label={`Seat ${seat.label}, ${seat.status}${seat.isWindow ? ", window" : ""}${seat.isAisle ? ", aisle" : ""}`}
            aria-pressed={seat.status === "selected"}
        >
            {seat.col}
        </button>
    )
}

function LegendItem({ className, label }: { className: string; label: string }) {
    return (
        <span className="inline-flex items-center gap-1.5">
            <span className={cn("h-3 w-3 rounded-sm border", className)} />
            {label}
        </span>
    )
}
