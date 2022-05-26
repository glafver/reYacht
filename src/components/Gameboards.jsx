import { useGameContext } from '../contexts/UserContext'
import { useEffect } from 'react'
import Chat from './Chat'
import Results from './Results'

const Gameboards = () => {
	const { userName, opponentName, yachts, shootTarget, move, setMove, setShootTarget, socket } = useGameContext()

	useEffect(() => {

		const update = (e) => {
			if (move && e.target.classList.contains('enemy-grid')) {
				setShootTarget({ row: Math.ceil(e.offsetY / 30) - 1, col: Math.ceil(e.offsetX / 30) - 1})
			}
		}
		window.addEventListener('click', update)

	}, [setShootTarget, move, socket])

	useEffect(() => {
		// if (shootTarget.row !== 0 && shootTarget.col !== 0)
		socket.emit('game:shoot', shootTarget)
	}, [shootTarget, socket])

	// When shot has been fired from us, the server tells us that it shouldnt be our turn anymore, upon receiving that message, the global move state is set to false for us
	socket.on('shoot-status:false', () => {
		setMove(false)
	})

	// When shot has been fired from our opponent, the server tells us that it should be our turn now, upon receiving that message, the global move state is therefore set to true
	socket.on('shoot-status:true', () => {
		setMove(true)
	})

	return (
		<>
			<Results />

			<div className='container d-flex justify-content-around'>

				<div className="board-container text-center">
					<h1>{userName}</h1>
					<div className="board player-grid m-auto" >

						{yachts && yachts.map(yacht =>
							<div key={`${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "green" }}></div>
						)}
					</div>
				</div>
				<div className="board-container text-center">
					<h1>{opponentName}</h1>
					<div className="board enemy-grid m-auto" style={{ cursor: move === true ? "pointer" : "not-allowed" }}>
					</div>
				</div>
			</div>

			<Chat />

		</>
	)
}

export default Gameboards
