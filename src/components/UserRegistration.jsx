import { Form, Button } from 'react-bootstrap'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from '../Contexts/UserContext'

const UserRegistration = () => {

    const { userName, setUserName, yachts, setYachts, waiting, setWaiting, socket } = useGameContext()
    const [nameInput, setNameInput] = useState('')
    const nameInputRef = useRef()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if (!nameInput.length) {
            return
        }

        socket.emit('user:joined', nameInput, (result) => {
            console.log(result.yachts)
            setYachts(result.yachts)
            setWaiting(result.waiting)
        })
        setUserName(nameInput)
        setNameInput('')
        navigate('/game')
    }

    return (
        <div>
            {!userName && <div className="form-container">
                <h1 className='mb-4'>{!userName && 'Enter your name to start the game:'}{userName && `Welcome to game ${userName}`}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 form-username" >
                        <Form.Control id="input-username"
                            onChange={e => setNameInput(e.target.value)}
                            placeholder="Enter name here"
                            ref={nameInputRef}
                            required
                            type="text"
                            value={nameInput} />
                        <button className="button btn-gold" type="submit">Start the game</button>
                    </Form.Group>
                </Form>
            </div>}
        </div>
    )
}

export default UserRegistration