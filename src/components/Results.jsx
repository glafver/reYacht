import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/UserContext'

const Results = () => {
	const [hitOrMiss, setHitOrMiss] = useState()
	const { userName, opponentName, shootTarget, move } = useGameContext()

	useEffect(() => {
		setHitOrMiss("that was a hit!")
	}, [])

	return (
		<div className="result-container">
			{shootTarget && <p>Shoot target: {shootTarget.row} {shootTarget.col}</p> }
			<p>You {move === true ? "move" : "wait"}</p>
			<p>{hitOrMiss}</p>
		</div>
	)
}

export default Results
