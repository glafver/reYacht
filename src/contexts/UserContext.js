import { createContext, useContext, useState } from 'react'
import socketio from "socket.io-client";
import standard_seagull from '../assets/images/seagull5.svg'

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
    const [resultsMessage, setResultsMessage] = useState('Welcome to game!')
    const [manualChoice, setManualChoice] = useState(false)
    const [illustration, setIllustration] = useState(standard_seagull)

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
        resultsMessage,
        setResultsMessage,
        manualChoice,
        setManualChoice,
        socket,
        illustration,
        setIllustration
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export default GameContextProvider