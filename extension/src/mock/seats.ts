import type { Seat, SeatStatus } from "@/types/seat"

const ROWS = [12, 13, 14, 15, 16, 17]
const COLUMNS = ["A", "B", "C", "D", "E", "F"]

const WINDOW_COLS = new Set(["A", "F"])
const AISLE_COLS = new Set(["C", "D"])

const presetStatus: Record<string, SeatStatus> = {
    "12B": "occupied",
    "12E": "occupied",
    "13C": "occupied",
    "13F": "occupied",
    "14D": "occupied",
    "15B": "occupied",
    "16C": "occupied",
    "17A": "occupied",
    "14A": "recommended",
    "15F": "recommended",
}

export const initialSeats: Seat[] = ROWS.flatMap((row) =>
    COLUMNS.map((col) => {
        const label = `${row}${col}`
        return {
            id: label,
            row,
            col,
            label,
            status: presetStatus[label] ?? "available",
            isWindow: WINDOW_COLS.has(col),
            isAisle: AISLE_COLS.has(col),
        }
    }),
)
