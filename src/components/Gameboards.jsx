import './css-components/Gameboards.css'
import Results from './Results'


const Gameboards = ({ userYachts, opponentsYachts }) => {

	return (
		<>
			<div className='container d-flex justify-content-around'>
				<div className="board-container text-center">
					<h1>My board </h1>
					<div className="board player-grid m-auto">

						{userYachts && userYachts.map(yacht =>
							<div key={`${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "green" }}></div>
						)}
					</div>
				</div>
				<div className="board-container text-center ">
					<h1>Enemy board</h1>
					<div className="board enemy-grid m-auto">
						{opponentsYachts && opponentsYachts.map(yacht =>
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
