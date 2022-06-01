import { useGameContext } from '../contexts/UserContext'
import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'

const GameRestart = () => {
    const { socket, userName } = useGameContext()

    const [ flicker, setFlicker ] = useState(false);

    const rematch = () => {
        socket.emit('rematch:offer', userName)
    }

    useEffect(() => {
    socket.on('rematch:requested', () => {
        setFlicker(true)
    })

    }, [socket])

    

    return (
        <div>
            <Button variant='secondary' onClick={rematch} className={flicker ? 'rematch-button' : ''}>Rematch</Button>
            <Button variant='secondary' className='new-opponent'>New opponent</Button>
        </div>
    )
}

export default GameRestart