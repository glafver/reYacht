import { useGameContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'


const CountdownTimer = () => {

    const [counter, setCounter] = useState(3)
    const { countdown, setCountdown } = useGameContext()

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
        counter === 0 && setCountdown(false)
    }, [counter, setCountdown])


    return (
        <Modal show={countdown} id="countdown">
            <Modal.Body >
                <p className='display-3'>Game will start in</p>
                <p id="countdownNumber">{counter}</p>
            </Modal.Body>
        </Modal>
    )
}

export default CountdownTimer