import './css-components/Gameboards.css'
import Results from './Results'
import { useGameContext } from '../contexts/GameContextProvider'


const Gameboards = () => {
	const { userName, opponentUserName, yachts, opponentYachts, socket } = useGameContext()

	return (
		<>
			<div className='container d-flex justify-content-around'>
				<div className="board-container text-center">
					<h1>{userName}</h1>
					<div className="board player-grid m-auto">

						{yachts && yachts.map(yacht =>
							<div key={`${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "green" }}></div>
						)}
					</div>
				</div>
				<div className="board-container text-center ">
					<h1>{opponentUserName}</h1>
					<div className="board enemy-grid m-auto">
						{opponentYachts && opponentYachts.map(yacht =>
							<div key={`${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "red" }}></div>
						)}
					</div>
				</div>
			</div>

			<Results />
		</>
	)
}

export default Gameboards
