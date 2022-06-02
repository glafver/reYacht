import { useGameContext } from '../contexts/UserContext'

const Results = () => {
	const { resultsMessage, illustration } = useGameContext()

	return (
		<div className="result-container">
			<img src={illustration} alt="illustration of seagull" className="seagull" />
			<p className="m-0">{resultsMessage}</p>
		</div>
	)
}

export default Results
