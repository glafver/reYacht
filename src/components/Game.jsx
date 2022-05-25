import { useEffect } from 'react'
import Gameboards from './Gameboards'
import { Modal } from 'react-bootstrap'
import CountdownTimer from './Countdown'
import { useGameContext } from '../contexts/UserContext'

const Game = () => {

	const { userName, opponentName, setOpponentName, countdown, waiting, setWaiting, setMove, setCountdown, socket } = useGameContext()

	useEffect(() => {
		// users listening when the opponent will be found
		socket.on('user:opponent_found', (waiting_opponent, opponent, move) => {
			console.log(move, 'move')
			setMove(move)
			setWaiting(waiting_opponent)
			setOpponentName(opponent)

			// showing a modal with countdown
			setCountdown(true)

		});

	}, [socket, setOpponentName, setWaiting, setCountdown, setMove])


	return (
		<div>
			<Modal id="modalDialog" show={waiting} className='d-flex align-items-center text-center'>
				<Modal.Body id="modalContent">
					<h2>Welcome to the game {userName}!</h2>
					<p>Wait here for another player.</p>
				</Modal.Body>
			</Modal>

			{countdown && <CountdownTimer />}

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