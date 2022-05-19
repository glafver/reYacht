import {useState, useEffect} from 'react'
import './css-components/Results.css'

const Results = () => {
	const [resultMsg, setResultMsg] = useState()
	const [hitOrMiss, setHitOrMiss] = useState()

	useEffect(() => {
		setResultMsg("waiting for your turn")
		setHitOrMiss("that was a hit!")
	}, [])

	return (
		<div className="result-container">
			<p>{hitOrMiss}</p>
			<p>{resultMsg}</p>
		</div>
	)
}

export default Results
