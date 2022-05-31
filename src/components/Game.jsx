import { useEffect } from 'react'
import Gameboards from './Gameboards'
import { Modal } from 'react-bootstrap'
import CountdownTimer from './Countdown'
import { useGameContext } from '../contexts/UserContext'

const Game = () => {

	const { userName, opponentName, setOpponentName, countdown, waiting, setWaiting, setMove, setCountdown, set_results_Message, socket } = useGameContext()

	useEffect(() => {
		// users listening when the opponent will be found
		socket.on('user:opponent_found', (waiting_opponent, opponent, move) => {

			setMove(move)
			setWaiting(waiting_opponent)
			setOpponentName(opponent)

			if (move) {
				set_results_Message("You shoot first! Try to hit one of the enemy's yachts!")
			} else {
				set_results_Message("Wait for your turn. Your enemy is shooting first.")
			}

			// showing a modal with countdown
			setCountdown(true)

		});

	}, [socket, setOpponentName, setWaiting, setCountdown, setMove, set_results_Message])


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