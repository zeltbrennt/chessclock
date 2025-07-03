export interface ClockButtonProps {
    time: number,
    active: boolean,
    countdownRunning: boolean,
    onClick (): void,
    rotated?: boolean,
    mode: "Bullet" | "Blitz" | "Rapid" | "Classical"
}

export class TimeControl {

    minutes: number
    increment: number
    name: string
    mode: "Bullet" | "Blitz" | "Rapid" | "Classical"

    constructor(shortNotation: string) {
        const [minutes, increment] = shortNotation.split('+').map(x => parseInt(x))

        this.minutes = minutes
        this.increment = increment
        this.name = shortNotation
    
        if (minutes < 3) {
            this.mode = "Bullet" 
        } else if (minutes < 10) {
            this.mode = "Blitz" 
        } else if (minutes < 30) {
            this.mode = "Rapid" 
        } else {
            this.mode = "Classical" 
        }
    }
}