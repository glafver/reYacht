import { createContext, useContext, useState } from 'react'
import socketio from "socket.io-client";

const UserContext = createContext()
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

export const useGameContext = () => {
    return useContext(UserContext)
}

const GameContextProvider = ({ children }) => {
    const [userName, setUserName] = useState()
    const [opponentName, setOpponentName] = useState()
    const [yachts, setYachts] = useState([])
    const [countdown, setCountdown] = useState(false)
    const [waiting, setWaiting] = useState()
    const [move, setMove] = useState()
    const [shootTarget, setShootTarget] = useState()
    const [results_message, set_results_Message] = useState()
    const [manualChoice, setManualChoice] = useState(false)
    const [gameRestart, setGameRestart] = useState(false)
	const [gameEnd, setGameEnd] = useState(false)
	const [gameEndMsg, setGameEndMsg] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [ yachtChoice, setYachtChoice ] = useState(false)

    // gameStatus is false before the user has first put in username and chosen ships. turns to true when this is done. This is so manual choice submit buttons will conditionally render based on if the game is active or just starting
    const [gameStatus, setGameStatus] = useState(false)

    const values = {
        userName,
        setUserName,
        opponentName,
        setOpponentName,
        yachts,
        setYachts,
        countdown,
        setCountdown,
        waiting,
        setWaiting,
        move,
        setMove,
        shootTarget,
        setShootTarget,
        results_message,
        set_results_Message,
        manualChoice,
        setManualChoice,
        gameRestart,
        setGameRestart,
        gameEnd,
        setGameEnd,
        gameEndMsg,
        setGameEndMsg,
        gameStatus,
        setGameStatus,
        disabled,
        setDisabled,
        yachtChoice,
        setYachtChoice,
        socket
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default GameContextProvider