/* import { useState, useEffect } from 'react'
import { useGameContext } from '../contexts/UserContext' */

const Results = () => {
	/* const [hit, setHit] = useState()
	const [miss, setMiss] = useState()
	const { userName, opponentName, shootTarget, move, socket } = useGameContext()

	const handleMiss = ((data) => {
		setMiss(data)
	})

	const handleHit = ((data) => {
		setHit(data)
	})

	useEffect(() => {
		socket.on('shot:hit', handleHit)

	}, [hit, socket])

	useEffect(() => {
		socket.on('shot:miss', handleMiss)
	}, [miss, socket]) */

	return (
		<div className="result-container">
			{/* {shootTarget && <p>Shoot target: {shootTarget.row} {shootTarget.col}</p> }
			<p>You {move === true ? "move" : "wait"}</p>
			<p>{hit}</p>
			<p>{miss}</p> */}

		</div>
	)
}

export default Results
