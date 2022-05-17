import './Gameboards.css'

const Gameboards = () => {

	/* const createBoard = ((grid, squares) => {
		for (let i = 0; i < width*width; i++) {
		  const square = document.createElement('div')
		  square.dataset.id = i
		  grid.appendChild(square)
		  squares.push(square)
		}
	}) */

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
