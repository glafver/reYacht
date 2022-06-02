import { useGameContext } from '../contexts/UserContext'
import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GameRestart = () => {
    const navigate = useNavigate()

    const { socket, userName, results_message } = useGameContext()

    const [ disabled, setDisabled ] = useState(false)
    const [ flicker, setFlicker ] = useState(false);

    const rematch = () => {
        if (disabled === false) {
            socket.emit('rematch:offer', userName)
        } else {
            return
        }
        setDisabled(true)
    }

    useEffect(() => {
    socket.on('rematch:requested', () => {
        console.log('hi')
        setFlicker(true)
    })

    socket.on('rematch:agreed', () => {
        setFlicker(false)
        setDisabled(false)
    })

    }, [socket])

    const navigateHome = () => {
        // Leave the room and navigate home
        console.log(socket)
        navigate('/')
    }


    return (
        <>
            <div>{results_message}</div>
            <div className='buttons-container'>
                <Button variant='secondary' onClick={rematch} disabled={disabled} className={flicker ? 'flicker-rematch-button' : 'rematch-button'}>Rematch</Button>
                {disabled && <span className='waiting-for-opponent-msg'>Rematch offer sent</span>}
                <Button variant='secondary' onClick={navigateHome} className='new-opponent'>New opponent</Button>
            </div>
        </>
    )
}

export default GameRestart