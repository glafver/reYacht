import { useGameContext } from '../contexts/UserContext'
import { useEffect } from 'react'
import Chat from './Chat'
import Results from './Results'
/* seagulls */
import happy_seagull from '../assets/images/seagull1.svg'
import watching_seagull from '../assets/images/seagull2.svg'
import really_happy_seagull from '../assets/images/seagull3.svg'
import really_sad_seagull from '../assets/images/seagull4.svg'

const Gameboards = () => {
	const { userName, opponentName, yachts, shootTarget, move, setMove, setShootTarget, set_results_Message, socket, setIllustration } = useGameContext()

	const update = (e) => {
		e.preventDefault()
		if (move && !e.target.classList.contains('blocked')) {

			let result = e.target.id.split("_")
			setShootTarget({ row: Number(String(result[1])[0]), col: Number(String(result[1])[1]) })
		}
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
				setIllustration(happy_seagull)

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
					setIllustration(really_happy_seagull)

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
					setIllustration(really_sad_seagull)

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
			} else {

				for (let point of killed_yacht.points) {
					document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_killed')
				}
				set_results_Message('Looooooseeeeeer!!!')
			}
		}
		socket.on('shot:winner', handleWinner)
	}, [socket, set_results_Message])

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
			<Results />
			<div className="all-boards">
				<div className="board-container text-center">
					<h2>You: {userName}</h2>
					<div className="board player-grid m-auto" >

						{yachts &&
							[...Array(100).keys()].map((div) =>
								<div key={div} className="board_cell" id={div < 10 ? 'myfield_0' + div : 'myfield_' + div} style={{ cursor: "not-allowed" }}></div>
							)
						}

					</div>
				</div>
				<div className="board-container text-center">
					<h2>Enemy: {opponentName}</h2>

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
