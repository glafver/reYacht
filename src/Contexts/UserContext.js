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
    const [ gameStatus, setGameStatus ] = useState(false)
    const [ winner, setWinner ] = useState()

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
        gameStatus,
        setGameStatus,
        winner,
        setWinner,
        socket
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default GameContextProvider