// import { useEffect, useState } from 'react'
import Gameboards from './Gameboards'
import { Modal } from 'react-bootstrap'
import CountdownTimer from './Countdown'
import { useGameContext } from '../Contexts/UserContext'

const Game = () => {

	const { userName, setUserName, opponentName, setOpponentName, yachts, setYachts, opponentYachts, setOpponentYachts, countdown, waiting, setWaiting, setCountdown, socket } = useGameContext()

	// users listening when the opponent will be found
	socket.on('user:opponent_found', (waiting_opponent, room) => {

		setWaiting(waiting_opponent)

		// finding out opponent name for every user and settin yachts for both
		// NEEDS TO B MOVED TO SERVER!!!!!!!!!!!!!!
		if (room.users[0].username === userName) {
			setOpponentName(room.users[1].username)
			setOpponentYachts(room.users[1].yachts)
		} else {
			setOpponentName(room.users[0].username)
			setOpponentYachts(room.users[0].yachts)
		}

		// showing a modal with countdown
		setCountdown(true)

	});

	return (
		<div>
			<Modal show={waiting} className='d-flex align-items-center'>
				<Modal.Body>
					Waiting for another player
				</Modal.Body>
			</Modal>

			{countdown && <CountdownTimer />}

			{userName &&
				<div>
					<h1 className='mb-4'>Welcome to the game {userName}!</h1>
				</div>
			}

			{opponentName &&
				<>
					<div className="container">
						<Gameboards />
					</div>
				</>
			}
		</div>
	)
}

export default Game