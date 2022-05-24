import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/UserContext'

const Results = () => {
	const [hit, setHit] = useState()
	const [miss, setMiss] = useState()
	const { userName, opponentName, shootTarget, move, socket } = useGameContext()
/* 
	useEffect(() => {
		setHitOrMiss("that was a hit!")
	}, []) */

	const handleHit = ((data) => {
		console.log(data)
	})

	useEffect(() => {
		socket.on('shot:hit', handleHit)

	}, [hit, socket])

	return (
		<div className="result-container">
			{shootTarget && <p>Shoot target: {shootTarget.row} {shootTarget.col}</p> }
			<p>You {move === true ? "move" : "wait"}</p>
			<p>{hit}</p>
			<p>{miss}</p>

		</div>
	)
}

export default Results
