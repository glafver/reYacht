import Countdown from 'react-countdown'
import { useGameContext } from '../contexts/UserContext'

const CountdownTimer = () => {

    const { setCountdown } = useGameContext()

    const renderer = ({ seconds, completed }) => {

        if (!completed) {
            // If the countdown is active, render this span.
            return <span> Starting game in... {seconds}</span>

        } else {
            // When countdown is over return nothing.
            setCountdown(false)
            return
        }
    }

    return (
        <div>
            {<Countdown
                date={Date.now() + 5000}
                renderer={renderer} />}
        </div>
    )
}

export default CountdownTimer