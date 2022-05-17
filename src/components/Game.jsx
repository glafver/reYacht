import { useEffect } from 'react'
import { Button, Image } from 'react-bootstrap'
import test_image from '../assets/images/test_image.png'

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
		<div className="container-fluid vh-100 d-flex align-items-center justify-content-center flex-column">
			<Image fluid src={test_image} className='col-6 m-2'></Image>
			<p>test</p>
			<Button onClick={handleStartGame}>Start</Button>
		</div>
	)
}

export default Game
