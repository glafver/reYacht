import Countdown from 'react-countdown'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CountdownTimer = () => {

    let navigate = useNavigate()

    const renderer = ({ seconds, completed }) => {
        if (completed) {
            // If the timer is completed, navigate to 
            navigate("/game")
            // return <span>Game started!</span>
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