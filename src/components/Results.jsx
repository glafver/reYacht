import { useGameContext } from '../contexts/UserContext'

const Results = () => {
	const { results_message, illustration } = useGameContext()

	return (
		<div className="result-container">
			<img src={illustration} className="seagull"/>
			<p className="m-0">{results_message}</p>
		</div>
	)
}

export default Results
