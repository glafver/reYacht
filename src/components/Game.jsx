import { useEffect, useState } from 'react'
import Gameboards from './Gameboards'
import { Modal } from 'react-bootstrap'
import CountdownTimer from './Countdown'
import { useGameContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import confused_seagull from '../assets/images/seagull10.svg'

const Game = () => {

	const { userName, setUserName, setShootTarget, setYachts, opponentName, setOpponentName, countdown, waiting, setWaiting, setMove, setCountdown, setResultsMessage, socket } = useGameContext()

	const navigate = useNavigate()
	const [disconnect, setDisconnect] = useState(false)

	const handleRestartGame = () => {
		console.log('disc')
		socket.emit('game:end')
		for (let point of document.getElementsByClassName('board-cell')) {
			point.classList.remove('board_yacht', 'board_miss', 'board_my_yacht_miss', 'board_hit', 'board_killed', 'blocked', 'board_my_yacht_killed')
		}
		setUserName()
		setOpponentName()
		setShootTarget()
		navigate('/')
	}

	useEffect(() => {
		// users listening when the opponent will be found
		socket.on('user:opponent_found', (waiting_opponent, opponent, move) => {

			setMove(move)
			setWaiting(waiting_opponent)
			setOpponentName(opponent)

			if (move) {
				setResultsMessage("You shoot first! Try to hit one of the enemy's yachts!")
			} else {
				setResultsMessage("Wait for your turn. Your enemy is shooting first.")
			}

			// showing a modal with countdown
			setCountdown(true)

		});

		socket.on('user:disconnected', () => {
			setDisconnect(true)

		})

	}, [socket, setUserName, setOpponentName, setShootTarget, setYachts, setWaiting, setCountdown, setMove, setResultsMessage])

	useEffect(() => {
		if (!userName) {
			navigate('/')
		}
	}, [navigate, userName])



	return (
		<div>
			<Modal id="restartModal" show={disconnect}>
				<Modal.Body id="modalContentYachts">
					<div className='d-flex justify-content-center flex-column'>
						<h2>Your enemy disconnected. Restart the game.</h2>
						<img src={confused_seagull} alt="seagull" />
						<button className="button btn-gold" onClick={handleRestartGame}>Restart the game</button>
					</div>

				</Modal.Body>
			</Modal>

			<Modal id="modalDialogWaiting" show={waiting}>
				<Modal.Body id="modalContent">
					<h2>Welcome to the game {userName}!</h2>
					<p id="modalText">Wait here for another player.</p>
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