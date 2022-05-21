import { createContext, useContext, useState } from 'react'
import socketio from "socket.io-client";

const UserContext = createContext()
const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

export const useGameContext = () => {
    return useContext(UserContext)
}

const GameContextProvider = ({ children }) => {
    const [ userName, setUsername ] = useState()
    const [ opponentName, setOpponentName ] = useState()
    const [ countdown, setCountdown ] = useState(false)

    const values = {
        userName,
        setUsername,
        opponentName,
        setOpponentName,
        countdown,
        setCountdown,
        socket
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default GameContextProvider