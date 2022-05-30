import { useGameContext } from '../contexts/UserContext'
import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import '../assets/scss/GameRestart.css';

const GameRestart = () => {
    const { socket, userName } = useGameContext()

    const [ flicker, setFlicker ] = useState(false);

    useEffect(() => {
    socket.on('rematch:requested', () => {
        setFlicker(true)
    })
    }, [socket])
    

    const rematch = () => {
        socket.emit('rematch:offer', userName)
    }

    return (
        <div>
            <Button variant='secondary' onClick={rematch} className={flicker ? 'rematch-button' : ''}>Rematch</Button>
            <Button variant='secondary'>New opponent</Button>
        </div>
    )
}

export default GameRestart