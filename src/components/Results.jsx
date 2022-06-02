import { useGameContext } from '../contexts/UserContext'
import GameRestart from './GameRestart'

const Results = () => {
	const { results_message, gameRestart, gameEnd } = useGameContext()

	return (
		<div className="result-container">

			<p className='m-0'>{results_message}</p>

			{gameEnd && <GameRestart/>}
			{/* <GameRestart/> */}

		</div>
	)
}

export default Results
