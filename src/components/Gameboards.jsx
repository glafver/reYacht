import './css-components/Gameboards.css'
import Results from './Results'


const Gameboards = () => {


	return (
		<>
			<div className="boards">
				<div className="board-container">
					<h1>My board</h1>
					<div className="board player-grid">
					</div>
				</div>
				<div className="board-container">
					<h1>Enemy board</h1>
					<div className="board enemy-grid">
					</div>
				</div>
			</div>
			<Results />
		</>
	)
}

export default Gameboards
