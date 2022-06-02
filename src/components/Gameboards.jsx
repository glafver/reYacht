import { useGameContext } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import Chat from './Chat'
import Results from './Results'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

/* seagulls */
import happy_seagull from '../assets/images/seagull1.svg'
import watching_seagull from '../assets/images/seagull2.svg'
import really_happy_seagull from '../assets/images/seagull3.svg'
import really_sad_seagull from '../assets/images/seagull4.svg'
import ohoy_seagull from '../assets/images/seagull5.svg'
import welldone_seagull from '../assets/images/seagull6.svg'
import captain_seagull from '../assets/images/seagull7.svg'
import standard_seagull from '../assets/images/seagull5.svg'

const Gameboards = () => {

	const { userName, setUserName, opponentName, setOpponentName, yachts, setYachts, shootTarget, move, setMove, setShootTarget, set_results_Message, setManualChoice, socket, illustration, setIllustration } = useGameContext()

	const navigate = useNavigate()

	const [gameEnd, setGameEnd] = useState(false)
	const [gameEndMsg, setGameEndMsg] = useState('')

	const update = (e) => {
		e.preventDefault()
		if (move && !e.target.classList.contains('blocked')) {

			let result = e.target.id.split("_")
			setShootTarget({ row: Number(String(result[1])[0]), col: Number(String(result[1])[1]) })
		}
	}

	const handleRestartGame = () => {
		console.log('wowww')
		socket.emit('game:end')
		for (let point of document.getElementsByClassName('board-cell')) {
			point.classList.remove('board_yacht', 'board_miss', 'board_my_yacht_miss', 'board_hit', 'board_killed', 'blocked', 'board_my_yacht_killed')
		}
		setUserName()
		setOpponentName()
		setYachts([])
		setGameEnd(false)
		setShootTarget()
		setManualChoice(false)
		setIllustration(standard_seagull)
		set_results_Message('Welcome to game!')
		navigate('/')
	}

	useEffect(() => {
		const handleMiss = (user_id, point) => {
			if (socket.id === user_id) {
				setMove(false)

				document.getElementById('enemyfield_' + point.row + point.col).classList.add('board_miss', 'blocked')
				set_results_Message("You missed! Wait for your enemy's move and then try again!")
				setIllustration(watching_seagull)
			} else {
				setMove(true)
				document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_miss')
				set_results_Message('Your opponent missed! Your turn to shoot!')
				setIllustration(captain_seagull)

			}
		}
		socket.on('shot:miss', handleMiss)
	}, [socket, setMove, set_results_Message, setIllustration])

	useEffect(() => {
		const handleHit = (user_id, point, killed_yacht) => {
			if (socket.id === user_id) {
				setMove(false)

				document.getElementById('enemyfield_' + point.row + point.col).classList.add('board_hit', 'blocked')

				if (killed_yacht) {
					for (let point of killed_yacht.points) {
						document.getElementById('enemyfield_' + point.row + point.col).classList.add('board_killed', 'blocked')
					}
					set_results_Message("Great! You've hit a whole ship! Wait for your enemy's move and then continue to shoot!")
					setIllustration(welldone_seagull)

				} else {
					set_results_Message('Good job! You hit one of the ships! Try more on the next turn!')
					setIllustration(happy_seagull)

				}
			} else {
				setMove(true)

				document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_hit')
				if (killed_yacht) {
					for (let point of killed_yacht.points) {
						document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_killed')
					}
					set_results_Message('Tragedy! One of your ships was killed! Your turn now - lets get revenge!')
					setIllustration(ohoy_seagull)

				} else {
					set_results_Message('Oh no! One of your ships was shot! Your turn now!')
					setIllustration(watching_seagull)
				}
			}
		}
		socket.on('shot:hit', handleHit)
	}, [socket, setMove, set_results_Message, setIllustration])

	useEffect(() => {
		const handleWinner = (user_id, point, killed_yacht) => {
			if (socket.id === user_id) {

				for (let point of killed_yacht.points) {
					document.getElementById('enemyfield_' + point.row + point.col).classList.add('board_killed', 'blocked')
				}
				set_results_Message('You won!!! Congratulations!!!')
				setGameEnd(true)
				setGameEndMsg('You won! Congratulations! Press the button to restart the game.')
				setIllustration(really_happy_seagull)
			} else {

				for (let point of killed_yacht.points) {
					document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_killed')
				}
				set_results_Message('Looooooseeeeeer!!!')
				setGameEndMsg('You lost! Press the button to restart the game and try one more time.')
				setGameEnd(true)
				setIllustration(really_sad_seagull)
			}
		}
		socket.on('shot:winner', handleWinner)
	}, [socket, set_results_Message, setIllustration, setGameEnd])

	useEffect(() => {
		socket.emit('game:shoot', shootTarget)
	}, [shootTarget, socket])

	useEffect(() => {
		if (yachts.length !== 0) {
			for (let yacht of yachts) {
				for (let point of yacht.points) {
					let cell = document.getElementById('myfield_' + point.row + point.col)
					cell.classList.add('board_yacht')
				}
			}
		}

	}, [yachts])

	return (
		<>
			<Modal id="restartModal" show={gameEnd}>
				<Modal.Body id="modalContentYachts">
					<div className='d-flex justify-content-center flex-column'>
						<h2>{gameEndMsg}</h2>
						<img src={illustration} alt="seagull"/>
						<button className="button btn-gold" onClick={handleRestartGame}>Restart the game</button>
					</div>

				</Modal.Body>
			</Modal>

			<Results />
			<div className="all-boards">
				<div className="board-container text-center">
					<h2 className="username-title">Your board</h2>
					<p className="username-board">{userName}</p>
					<div className="board player-grid m-auto" >

						{yachts &&
							[...Array(100).keys()].map((div) =>
								<div key={div} className="board_cell" id={div < 10 ? 'myfield_0' + div : 'myfield_' + div} style={{ cursor: "not-allowed" }}></div>
							)
						}

					</div>
				</div>
				<div className="board-container text-center">
					<h2 className="username-title">Enemy's board</h2>
					<p className="username-board">{opponentName}</p>

					<div className="board enemy-grid m-auto" style={{ cursor: move === true ? "pointer" : "not-allowed" }} >

						{yachts &&
							[...Array(100).keys()].map((div) =>
								<div key={div} className="board_cell" id={div < 10 ? 'enemyfield_0' + div : 'enemyfield_' + div} onClick={update} style={{ cursor: move === true ? "pointer" : "not-allowed" }} ></div>
							)
						}

					</div>
				</div>
			</div>

			<Chat />

		</>
	)
}

export default Gameboards
