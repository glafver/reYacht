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
        socket
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default GameContextProvider