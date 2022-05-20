import { Form, Button, Modal } from 'react-bootstrap'
import { useState, useRef } from 'react'
import Gameboards from './Gameboards'
import CountdownTimer from './Countdown'

const UserRegistration = ({ socket }) => {

    const [nameInput, setNameInput] = useState('')
    const [userName, setUserName] = useState('')
    const [opponentName, setOpponentName] = useState('')
    const [userYachts, setUserYachts] = useState([])
    const [opponentsYachts, setOpponentsYachts] = useState([])
    const [gameRoom, setGameRoom] = useState('')
    const [waiting, setWaiting] = useState()
    const [countdown, setCountdown] = useState(false)
    const nameInputRef = useRef()

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
        setGameRoom(room)

        // finding out opponent name for every user and settin yachts for both
        if (room.users[0].username === userName) {
            setOpponentName(room.users[1].username)
            console.log(room.users[0].yachts)
            setUserYachts(room.users[0].yachts)
            setOpponentsYachts(room.users[1].yachts)
        } else {
            setOpponentName(room.users[0].username)
            setUserYachts(room.users[1].yachts)
            setOpponentsYachts(room.users[0].yachts)
        }

        // showing a modal with countdown
        setCountdown(true)
    });

    // after countdown finished => navigate to game 
    // navigate("/game")

    return (
        <div>
            <Modal show={waiting} className='d-flex align-items-center'>
                <Modal.Body>
                    Waiting for another player
                </Modal.Body>
            </Modal>

            <Modal show={countdown} className='d-flex align-items-center'>
                <Modal.Body>
                    <CountdownTimer />
                </Modal.Body>
            </Modal>

            {!userName && <div className='d-flex flex-column vh-50 align-items-center'>
                <h1 className='mb-4'>{!userName && 'Enter your name to start the game:'}{userName && `Welcome to game ${userName}`}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Control className='col-6 mb-4'
                            onChange={e => setNameInput(e.target.value)}
                            placeholder="What is your nickname?"
                            ref={nameInputRef}
                            required
                            type="text"
                            value={nameInput} />
                        <Button variant="success" type="submit">Start the game</Button>
                    </Form.Group>
                </Form>
            </div>}

            {userName &&
                <h1 className='mb-4'>Welcome to game {userName}</h1>

            }

            {opponentName &&
                <>
                    <h1 className='mb-4'>Your opponent name is {opponentName}</h1>
                    <h1 className='mb-4'>You are in the {gameRoom.id}</h1>
                    <div className="container">
                        {<Gameboards userYachts={userYachts} opponentsYachts={opponentsYachts} />}

                    </div>
                </>

            }
        </div >
    )
}

export default UserRegistration