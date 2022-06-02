import { useGameContext } from '../contexts/UserContext'
import GameRestart from './GameRestart'

const Results = () => {
	const { results_message, gameRestart } = useGameContext()

	return (
		<div className="result-container">

			{/* {!gameRestart && <p>{results_message}</p>} */}

			<p>{results_message}</p>

			{/* {gameRestart && <GameRestart/>} */}
			<GameRestart/>

		</div>
	)
}

export default Results
