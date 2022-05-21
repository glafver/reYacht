import { Form, Button } from 'react-bootstrap'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from '../Contexts/UserContext'

const UserRegistration = () => {

    const { userName, setUsername, socket } = useGameContext()
    const [nameInput, setNameInput] = useState('')
    const nameInputRef = useRef()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if (!nameInput.length) {
            return
        }

        socket.emit('user:joined', nameInput)
        setUsername(nameInput)
        setNameInput('')
        navigate('/game')
        return
    }

    return (
        <div>
            {!userName && <div className='d-flex flex-column vh-50 align-items-center'>
                <h1 className='mb-4'>{!userName && 'Enter your name to start the game:'}{userName && `Welcome to game ${userName}`}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Control className='col-6 mb-4'
                            onChange={e => setNameInput(e.target.value)}
                            placeholder="What is your nickname?"
                            ref={nameInputRef}
                            required
                            type="text"
                            value={nameInput} />
                        <Button variant="success" type="submit">Start the game</Button>
                    </Form.Group>
                </Form>
            </div>}
        </div >
    )
}

export default UserRegistration