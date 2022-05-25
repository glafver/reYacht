import { useGameContext } from '../contexts/UserContext'
import { useState, useEffect } from 'react'
import Chat from './Chat'
/* import Results from './Results' */

const Gameboards = () => {
	const { userName, opponentName, yachts, shootTarget, move, setShootTarget, socket } = useGameContext()
	const [hit, setHit] = useState()
	const [miss, setMiss] = useState()
	const [shots, setShots] = useState([])
	const [hitWholeYacht, setHitWholeYacht] = useState()

	const [rowCorr, setRowCorr] = useState()
	const [colCorr, setColCorr] = useState()

	let userShots = []

	const userHits = (data) => {
		console.log(data.corrs[0])
		if(data.id === socket.id) {
			userShots.push(data.corrs[0])

		} else {
			return
		}
	}

	const handleShots = (rowCor, colCor) => {
		//check if it really is your turn

		//place all previous shots on the board
		setShots(prevShots => 
			[
				...prevShots,
				[rowCor, colCor]
			]
		)
		
		setHit(rowCor, colCor)

		//place the new shot on the board
		if (hit) {
			setHit()
			if (hitWholeYacht) {
				setHitWholeYacht()
			}
		} if (miss) {
			setMiss()
		} else {
			return
		}
		console.log(shots)
		socket.emit('shot:fired')
	}

	const handleHit = ((data, rowCor, colCor) => {
		//check if it really is your turn

		//place all previous hits on the board
		
		console.log("hit",hit)
		
		//place the new hit on the board
		setRowCorr(rowCor)
		setColCorr(colCor)
		
		//change turn
		/* socket.emit('change:turn') */
	})

	useEffect(() => {
		socket.on('store:hit', userHits)
	}, [hit])

	useEffect(() => {
		socket.on('shot:hit', handleShots)
	}, [hit])

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
	}, [shootTarget, socket])

	return (
		<>
			{/* <Results /> */}
			<div className="result-container">
				{shootTarget && <p>Shoot target: {shootTarget.row} {shootTarget.col}</p> }
				<p>You {move === true ? "move" : "wait"}</p>
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
					
					<div className="board enemy-grid m-auto" style={{ cursor: move === true ? "pointer" : "not-allowed" }}>
						{hit.map((rowCorr, colCorr) => {
							return (<div style={{gridRow: rowCorr + "/" + (rowCorr+1), gridColumn: colCorr + "/" + (colCorr+1), backgroundColor: "red"}}></div>)
						}) }
					</div>
{/* 					<div className="board enemy-grid m-auto" style={{ cursor: move === true ? "pointer" : "not-allowed" }}>
						{miss.map((rowCorr, colCorr) => {
							return (<div style={{gridRow: rowCorr + "/" + (rowCorr+1), gridColumn: colCorr + "/" + (colCorr+1), backgroundColor: "yellow"}}></div>)
						}) }
					</div> */}
				</div>
			</div>

			<Chat />

		</>
	)
}

export default Gameboards
