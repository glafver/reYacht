import { useGameContext } from '../contexts/UserContext'

const Results = () => {
	const { results_message, move } = useGameContext()

	return (
		<div className="result-container">
			{/* {shootTarget && <p>Shoot target: {shootTarget.row} {shootTarget.col}</p> } */}

			<p>You {move === true ? "move" : "wait"}</p>
			<p>{results_message}</p>


		</div>
	)
}

export default Results
