import './css-components/Gameboards.css'
import Results from './Results'
import { useGameContext } from '../Contexts/UserContext'
import { useEffect } from 'react'
import Chat from './Chat'

const Gameboards = () => {
	const { userName, opponentName, yachts, shootTarget, move, setShootTarget } = useGameContext()

	useEffect(() => {

		const update = (e) => {
			if (move && e.target.classList.contains('enemy-grid')) {
				console.log('press')
				setShootTarget({ row: Math.ceil(e.offsetY / 30), col: Math.ceil(e.offsetX / 30) })
			}
		}
		window.addEventListener('click', update)

	}, [setShootTarget, move])

	return (
		<>
			<h1>Shoot target: {shootTarget.row} {shootTarget.col}</h1>
			<h1>You {move === true ? "move" : "wait"}</h1>
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

			<Results />
			<Chat />

		</>
	)
}

export default Gameboards
