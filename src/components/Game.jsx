import { useEffect, useState } from 'react'
import Gameboards from './Gameboards'
import { Button, Modal } from 'react-bootstrap'
import CountdownTimer from './Countdown'
import { useGameContext } from '../Contexts/UserContext'

const Game = () => {

    const { userName, setOpponentName, opponentName, countdown, setCountdown, socket } = useGameContext()

    const [gameRoom, setGameRoom] = useState('')
    const [waiting, setWaiting] = useState()

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

	const handleStartGame = () => {
		console.log("Emitting 'game:start' event to server")
		socket.emit('game:start')
	}

	const onStartGame = () => {
		console.log("Starting game!")

	}

	useEffect(() => {
		
		socket.on('game:start', onStartGame)

	}, [socket])

	return (
		<div>
            <Modal show={waiting} className='d-flex align-items-center'>
                <Modal.Body>
                    Waiting for another player
                </Modal.Body>
            </Modal>
			
            {countdown && <CountdownTimer/>} 

			{userName &&
				<div>
                <h1 className='mb-4'>Welcome to the game {userName}!</h1>
				</div>
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
			<Button onClick={handleStartGame}>Start</Button>
		</div>
	)
}

export default Game
