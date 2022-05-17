import Countdown from 'react-countdown'

const CountdownTimer = () => {

    const renderer = ({ seconds, completed }) => {
        if (completed) {
            // If the timer is completed, render this span
            return <span>Game started!</span>
        } else {
            // If the timer isn't completed, render the timer
            return <span>Starting game in... {seconds}</span>
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