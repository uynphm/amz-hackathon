export type SeatStatus = "available" | "selected" | "occupied" | "recommended"

export interface Seat {
    id: string
    row: number
    col: string
    label: string
    status: SeatStatus
    isWindow: boolean
    isAisle: boolean
}

export type SeatAction =
    | { type: "SELECT_SEAT"; seatId: string }
    | { type: "CLEAR_SELECTION" }
    | { type: "HIGHLIGHT_RECOMMENDED"; seatIds: string[] }
