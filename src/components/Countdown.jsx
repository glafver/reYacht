import Countdown from 'react-countdown'

const CountdownTimer = () => {

    const renderer = ({ seconds, completed }) => {

        if (!completed) {
            // If the countdown is active, render this span.
            return <span> Starting game in... {seconds}</span>

        } else {
            // When countdown is over return nothing.
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