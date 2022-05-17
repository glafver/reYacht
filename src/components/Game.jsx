import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Gameboards from './Gameboards'

const Game = ({ socket }) => {

	const handleStartGame = () => {
		console.log("Emitting 'game:start' event to server")
		socket.emit('game:start')
	}

	const onStartGame = () => {
		console.log("Starting game!")

	}

	useEffect(() => {

		socket.on('game:start', onStartGame)

	}, [socket])

	return (
		<div>
			<div className="container-fluid d-flex justify-content-between flex-row">
				<Gameboards />
			</div>

			<Button onClick={handleStartGame}>Start</Button>
		</div>
	)
}

export default Game
