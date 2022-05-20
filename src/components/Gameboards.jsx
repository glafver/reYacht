import './css-components/Gameboards.css'
import Results from './Results'


const Gameboards = ({ userYachts, opponentsYachts }) => {

	return (
		<>
			<div className="board-container">
				<h1>My board </h1>
				<div className="board player-grid">

					{userYachts && userYachts.map(yacht =>
						<div key={`${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "green" }}></div>
					)}
				</div>
			</div>
			<div className="board-container">
				<h1>Enemy board</h1>
				<div className="board enemy-grid">
					{opponentsYachts && opponentsYachts.map(yacht =>
						<div key={`${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "red" }}></div>
					)}
				</div>
			</div>
			<Results />
		</>
	)
}

export default Gameboards
