import './css-components/Gameboards.css'

const Gameboards = () => {


	return (
		<>
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
		</>
	)
}

export default Gameboards
