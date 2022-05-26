import { useGameContext } from '../contexts/UserContext'
import { useState, useEffect } from 'react'
import Chat from './Chat'
// import img_hit from '../assets/images/hit.png'
// import img_miss from '../assets/images/miss.png'
import Results from './Results'

const Gameboards = () => {
	const { userName, opponentName, yachts, shootTarget, move, setMove, setShootTarget, set_results_Message, socket } = useGameContext()
	const [hits, setHits] = useState([])
	const [miss, setMiss] = useState([])

	const [my_yachts_hits, set_my_yachts_Hits] = useState([])
	const [my_yachts_miss, set_my_yachts_Miss] = useState([])

	const update = (e) => {
		e.preventDefault()
		console.log('test function lol', e.nativeEvent.offsetY, e.nativeEvent.offsetX, Math.ceil(e.nativeEvent.offsetY / 30) - 1, Math.ceil(e.nativeEvent.offsetX / 30) - 1)
		console.log('The div was clicked.', e);
		if (move && !e.target.classList.contains('blocked')) {
			setShootTarget({ row: Math.ceil(e.nativeEvent.offsetY / 30) - 1, col: Math.ceil(e.nativeEvent.offsetX / 30) - 1 })
		}
	}

	const handleHit = (user_id, points, killed) => {
		if (socket.id === user_id) {
			setMove(false)
			setHits(prev => [...prev, points])
			if (killed) {
				set_results_Message('Great! You killed one of the ships! Wait and try again!')
			} else {
				set_results_Message('Good job! You shot one of the ships! Try more on the next turn! Wait and try again!')
			}
		} else {
			setMove(true)
			set_my_yachts_Hits(prev => [...prev, points])
			if (killed) {
				set_results_Message('Tragedy! One of your ships was killed! Your turn now!')
			} else {
				set_results_Message('Oh no! One of your ships was shot! Your turn now!')
			}
		}
	}

	const handleMiss = (user_id, points) => {
		console.log(points)
		if (socket.id === user_id) {
			setMove(false)
			setMiss(prev => [...prev, points])
			set_results_Message('You missed! Wait and try again!')
		} else {
			setMove(true)
			set_my_yachts_Miss(prev => [...prev, points])
			set_results_Message('Your opponent missed! Your turn now!')
		}
	}

	const handleWinner = (user_id, points, killed) => {
		if (socket.id === user_id) {
			setHits(prev => [...prev, points])
			set_results_Message('You won!!! Congratulations!!!')
		} else {
			set_my_yachts_Hits(prev => [...prev, points])
			set_results_Message('Looooooseeeeeer!!!')
		}
		console.log('winner', user_id, points, killed)
	}

	useEffect(() => {
		socket.on('shot:hit', handleHit)
	}, [socket])

	useEffect(() => {
		socket.on('shot:miss', handleMiss)
	}, [socket])

	useEffect(() => {
		socket.on('shot:winner', handleWinner)
	}, [socket])

	useEffect(() => {
		socket.emit('game:shoot', shootTarget)
	}, [shootTarget, socket])

	useEffect(() => {
		socket.on('shot:winner', handleWinner)
	}, [socket])

	return (
		<>
			<Results />
			<div className='container d-flex justify-content-around'>

				<div className="board-container text-center">
					<h1>{userName}</h1>
					<div className="board player-grid m-auto" >

						{yachts && yachts.map(yacht =>
							<div key={`yacht ${yacht.row_start} ${yacht.col_start}`} style={{ gridArea: (yacht.row_start + 1) + "/" + (yacht.col_start + 1) + "/" + yacht.row_end + "/" + yacht.col_end, backgroundColor: "green" }}>

							</div>
						)}
						{my_yachts_miss.length !== 0 && my_yachts_miss.map(miss =>
							<div key={`my_yachts_miss_${miss.row}_${miss.col}`} className="blocked d-flex" style={{ gridRow: (miss.row + 1), gridColumn: (miss.col + 1), backgroundColor: "yellow", cursor: "not-allowed" }}>
								{/* <img className='img-fluid' src={img_miss} alt="" /> */}
							</div>
						)}
						{my_yachts_hits.length !== 0 && my_yachts_hits.map(hit =>
							<div key={`my_yachts_hits_${hit.row}_${hit.col}`} className="blocked d-flex" style={{ gridRow: (hit.row + 1), gridColumn: (hit.col + 1), backgroundColor: "red", cursor: "not-allowed" }}>
								{/* <img className='img-fluid' src={img_hit} alt="" /> */}
							</div>
						)}
					</div>
				</div>
				<div className="board-container text-center">
					<h1>{opponentName}</h1>

					<div className="board enemy-grid m-auto" style={{ cursor: move === true ? "pointer" : "not-allowed" }} onClick={update}>
						{miss.length !== 0 && miss.map(miss =>
							<div key={`miss_${miss.row}_${miss.col}`} className="blocked d-flex" style={{ gridRow: (miss.row + 1), gridColumn: (miss.col + 1), backgroundColor: "yellow", cursor: "not-allowed" }}>
								{/* <img className='img-fluid' src={img_miss} alt="" /> */}
							</div>
						)}
						{hits.length !== 0 && hits.map(hit =>
							<div key={`hits_${hit.row}_${hit.col}`} className="blocked" style={{ gridRow: (hit.row + 1), gridColumn: (hit.col + 1), backgroundColor: "red", cursor: "not-allowed" }}>
								{/* <img className='img-fluid' src={img_hit} alt="" /> */}
							</div>
						)}
					</div>
				</div>
			</div>

			<Chat />

		</>
	)
}

export default Gameboards
