import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import SeatDemoApp from './SeatDemoApp'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SeatDemoApp />
    </StrictMode>,
)
