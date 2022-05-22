import { createContext, useContext, useState } from 'react'
import socketio from "socket.io-client";

export const GameContext = createContext()
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL);

export const useGameContext = () => {
	return useContext(GameContext)
}

export const GameContextProvider = ({ children }) => {
	const [userName, setUserName] = useState('')
	const [opponentUserName, setOpponentUserName] = useState('')
	const [yachts, setYachts] = useState([])
	const [opponentYachts, setOpponentYachts] = useState([])

	const values = {
		userName,
		setUserName,
		opponentUserName,
		setOpponentUserName,
		yachts,
		setYachts,
		opponentYachts,
		setOpponentYachts,
		socket
	}

	return (
		<GameContext.Provider value={values}>
			{children}
		</GameContext.Provider>
	)
}

export default GameContextProvider