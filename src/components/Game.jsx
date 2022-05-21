import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Gameboards from './Gameboards'
import Chat from './Chat'
import { useGameContext } from '../contexts/GameContextProvider'


const Game = () => {

	const { socket } = useGameContext()

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
			<div className="">
				<Gameboards />
			</div>

			<Button onClick={handleStartGame}>Start</Button>
			<Chat />
		</div>
	)
}

export default Game
