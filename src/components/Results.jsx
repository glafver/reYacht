import { useGameContext } from '../contexts/UserContext'
import GameRestart from './GameRestart'

const Results = () => {
	const { results_message, gameRestart } = useGameContext()

	return (
		<div className="result-container">

			<p className='m-0'>{results_message}</p>

			{gameRestart && <GameRestart/>}
			{/* <GameRestart/> */}

		</div>
	)
}

export default Results
