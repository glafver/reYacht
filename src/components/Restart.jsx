import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { useGameContext } from '../contexts/UserContext'

const Restart = () => {

    const { socket, setGameStatus, winner, setWinner } = useGameContext()
    const [ show, setShow ] = useState(true)

    socket.on('game:over', (user) => {
        setGameStatus(true)
        setWinner(user)
    })


    return (
        <div>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Game instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {winner} won the game!
                    <div>
                    <Button>Rematch</Button>
                    <Button>New opponent</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Restart