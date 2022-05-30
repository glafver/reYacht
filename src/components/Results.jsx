import { useGameContext } from '../contexts/UserContext'

const Results = () => {
	const { results_message } = useGameContext()

	return (
		<div className="result-container">

			<p>{results_message}</p>

		</div>
	)
}

export default Results
