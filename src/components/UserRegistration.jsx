// import { useNavigate } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'
import { useState, useRef } from 'react'
import Gameboards from './Gameboards'
import CountdownTimer from './Countdown'
import { useNavigate } from 'react-router-dom'

const UserRegistration = ({ socket }) => {

    const [nameInput, setNameInput] = useState('')
    const [userName, setUserName] = useState('')
    const [opponentName, setOpponentName] = useState('')
    const [gameRoom, setGameRoom] = useState('')
    const [waiting, setWaiting] = useState()
    const [countdown, setCountdown] = useState(false)
    const nameInputRef = useRef()

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault()
        if (!nameInput.length) {
            return
        }
        socket.emit('user:joined', nameInput)
        setWaiting(true)
        setUserName(nameInput)
        setNameInput('')
    }

    // users listening when the opponent will be found
    socket.on('user:opponent_found', (waiting_opponent, room) => {
        setWaiting(waiting_opponent)
        setGameRoom(room.id)

        // finding out opponent name for every user
        if (room.users[0].username === userName) {
            setOpponentName(room.users[1].username)
        } else {
            setOpponentName(room.users[0].username)
        }

        // showing a modal with countdown
        setCountdown(true)
    });

    // after countdown finished => navigate to game 
    // navigate("/game")

    return (
        <>
            <Modal show={waiting} className='d-flex align-items-center'>
                <Modal.Body>
                    Waiting for another player
                </Modal.Body>
            </Modal>

            <Modal show={countdown} className='d-flex align-items-center'>
                <Modal.Body>
                    <CountdownTimer/>
                </Modal.Body>
            </Modal>


            {!userName && <div className="form-container">
                <h1 className='mb-4'>{!userName && 'Please sign your name'}{userName && `Welcome to game ${userName}`}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 form-username" >
                        <Form.Control id="input-username"
                            onChange={e => setNameInput(e.target.value)}
                            placeholder="Enter name here"
                            ref={nameInputRef}
                            required
                            type="text"
                            value={nameInput} />
                        <button className="button btn-gold" type="submit">Start the game</button>
                    </Form.Group>
                </Form>
            </div>}

            {userName &&
                <h1 className='mb-4'>Welcome to game {userName}</h1>

            }

            {opponentName &&
                <>
                    <h1 className='mb-4'>Your opponent name is {opponentName}</h1>
                    <h1 className='mb-4'>You are in the {gameRoom}</h1>
					<div className="container d-flex justify-content-around flex-row">
						<Gameboards />
					</div>
                </>

            }
        </>
    )
}

export default UserRegistration