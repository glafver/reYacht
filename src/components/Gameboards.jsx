import { useGameContext } from '../contexts/UserContext'
import { useState, useEffect } from 'react'
import Chat from './Chat'
import Results from './Results'

const Gameboards = () => {
	const { userName, opponentName, yachts, shootTarget, move, setShootTarget, socket } = useGameContext()
	const [hit, setHit] = useState()
	/* const [miss, setMiss] = useState() */
	const [rowCorr, setRowCorr] = useState()
	const [colCorr, setColCorr] = useState()

	/* const handleMiss = ((data) => {
		setMiss(data)
	}) */

	const handleHit = ((data, rowCor, colCor) => {
		console.log(data, rowCor, colCor)
		setHit(data)
		setRowCorr(rowCor)
		setColCorr(colCor)
	})

	useEffect(() => {
		socket.on('shot:hit', handleHit)
	}, [hit, socket])

/* 	useEffect(() => {
		socket.on('shot:miss', handleMiss)
	}, [miss, socket])
 */
	useEffect(() => {

		const update = (e) => {
			if (move && e.target.classList.contains('enemy-grid')) {
				setShootTarget({ row: Math.ceil(e.offsetY / 30) - 1, col: Math.ceil(e.offsetX / 30) - 1})
			}
		}
		window.addEventListener('click', update)

	}, [setShootTarget, move, socket])

	useEffect(() => {
		// if (shootTarget.row !== 0 && shootTarget.col !== 0)
			socket.emit('game:shoot', shootTarget)
	}, [shootTarget])

	return (
		<>
			{/* <Results /> */}
			<div className="result-container">
				{shootTarget && <p>Shoot target: {shootTarget.row} {shootTarget.col}</p> }
				<p>You {move === true ? "move" : "wait"}</p>
				<p>{hit}</p>
				{/* <p>{miss}</p> */}

			</div>

			<div className='container d-flex justify-content-around'>

				<div className="board-container text-center">
					<h1>{userName}</h1>
					<div className="board player-grid m-auto" >

						{yachts && yachts.map(yacht =>
							<div key={`${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "green" }}></div>
						)}
					</div>
				</div>
				<div className="board-container text-center">
					<h1>{opponentName}</h1>
					<p>{rowCorr} and {colCorr}</p>
					

					<div className="board enemy-grid m-auto" style={{ cursor: move === true ? "pointer" : "not-allowed" }}>
						{hit && (<div style={{gridRow: rowCorr + "/" + (rowCorr+1), gridColumn: colCorr + "/" + (colCorr+1), backgroundColor: "red"}}></div>)}
					</div>
				</div>
			</div>

			<Chat />

		</>
	)
}

export default Gameboards
