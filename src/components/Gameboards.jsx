import { useGameContext } from '../contexts/UserContext'
import { useEffect } from 'react'
import Chat from './Chat'
import Results from './Results'
// import GameRestart from './GameRestart'
import ChooseYacht from './ChooseYacht'

const Gameboards = () => {
	const { userName, opponentName, yachts, shootTarget, move, setMove, setShootTarget, set_results_Message, setGameRestart, setYachts, gameEnd, setGameEnd, gameEndMsg, setGameEndMsg, socket } = useGameContext()

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
			} else {
				setMove(true)
				document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_miss')
				set_results_Message('Your opponent missed! Your turn to shoot!')
			}
		}
		socket.on('shot:miss', handleMiss)
	}, [socket, setMove, set_results_Message])

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
				} else {
					set_results_Message('Good job! You shot one of the ships! Try more on the next turn! Wait and try again!')
				}
			} else {
				setMove(true)

				document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_hit')
				if (killed_yacht) {
					for (let point of killed_yacht.points) {
						document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_killed')
					}
					set_results_Message('Tragedy! One of your ships was killed! Your turn now!')
				} else {
					set_results_Message('Oh no! One of your ships was shot! Your turn now!')
				}
			}
		}
		socket.on('shot:hit', handleHit)
	}, [socket, setMove, set_results_Message])

	useEffect(() => {
		const handleWinner = (user_id, point, killed_yacht) => {
			setGameRestart(true)
			if (socket.id === user_id) {

				for (let point of killed_yacht.points) {
					document.getElementById('enemyfield_' + point.row + point.col).classList.add('board_killed', 'blocked')
				}
				set_results_Message('You won!!! Congratulations!!!')
				setGameEnd(true)
				setGameEndMsg('You won! Congratulations! Press the button to restart the game.')
				// setIllustration(really_happy_seagull)
			} else {

				for (let point of killed_yacht.points) {
					document.getElementById('myfield_' + point.row + point.col).classList.add('board_my_yacht_killed')
				}
				set_results_Message('Looooooseeeeeer!!!')
				setGameEndMsg('You lost! Press the button to restart the game and try one more time.')
				setGameEnd(true)
				// setIllustration(really_sad_seagull)
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

	useEffect(() => {
	// Listener for when the server tells us an opponent has left to find a new opponent
	socket.on('leaving:room', () => {
		// Getting all player cells so they are iterable
		let playerCells = document.getElementsByClassName('player-cell')

		// Looping over player cells and removing classes for when a yacht is present, hit, missed and killed
		for (let cell of playerCells) {
			cell.classList.remove('board_yacht', 'board_my_yacht_hit', 'board_my_yacht_killed', 'board_my_yacht_miss')
		}
	})
	
	// Listener for when the server tells us it's time to recalibrate the users yachts (voted for rematching the other user)
	socket.on('recalibrating:yachts', (newYachts, userMove) => {
		console.log(newYachts)
		yachts.splice(0,4)
		setYachts(newYachts)
		if (userMove === false) {
			set_results_Message('Wait for your turn. Your enemy is shooting first.')
		} else {
			set_results_Message("You shoot first! Try to hit one of the enemy's yachts!")
		}

		// Getting all player cells so they are iterable
		let playerCells = document.getElementsByClassName('player-cell')

		// Looping over player cells and removing classes for when a yacht is present, hit, missed and killed
		for (let cell of playerCells) {
			cell.classList.remove('board_yacht', 'board_my_yacht_hit', 'board_my_yacht_killed', 'board_my_yacht_miss')
		}

		let opponentCells = document.getElementsByClassName('opponent-cell')

		for (let cell of opponentCells) {
			cell.classList.remove('board_yacht', 'board_hit', 'board_killed', 'board_miss', 'blocked')
		}
	})

	// Listener for when both players have agreed to rematch eachother
    // socket.on('rematch:agreed', () => {
	// 	console.log('hiii')
    //     setGameEnd(false)
	// 	setFlicker(false)
    // })
	}, [socket])

	return (
		<>
			<Results />
			<div className="all-boards">
				<div className="board-container text-center">
					<h2>You: {userName}</h2>
					<div className="board player-grid m-auto" >

						{yachts &&
							[...Array(100).keys()].map((div) =>
								<div key={div} className="board_cell player-cell" id={div < 10 ? 'myfield_0' + div : 'myfield_' + div} style={{ cursor: "not-allowed" }}></div>
							)
						}

					</div>
				</div>
				<div className="board-container text-center">
					<h2>Enemy: {opponentName}</h2>

					<div className="board enemy-grid m-auto" style={{ cursor: move === true ? "pointer" : "not-allowed" }} >

						{yachts &&
							[...Array(100).keys()].map((div) =>
								<div key={div} className="board_cell opponent-cell" id={div < 10 ? 'enemyfield_0' + div : 'enemyfield_' + div} onClick={update} style={{ cursor: move === true ? "pointer" : "not-allowed" }} ></div>
							)
						}

					</div>
				</div>
			</div>

			{/* <ChooseYacht></ChooseYacht> */}
			<Chat />

		</>
	)
}

export default Gameboards
