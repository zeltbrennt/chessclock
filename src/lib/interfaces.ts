export interface ClockButtonProps {
    time: number,
    active: boolean,
    countdownRunning: boolean,
    onClick (): void,
    rotated?: boolean
}