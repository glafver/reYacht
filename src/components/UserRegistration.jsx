import { Form, Modal } from 'react-bootstrap'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameContext } from '../contexts/UserContext'
import ChooseYacht from './ChooseYacht'

const UserRegistration = () => {

    const { userName, setUserName, setYachts, setWaiting, setManualChoice, socket } = useGameContext()
    const [nameInput, setNameInput] = useState('')
    const [yachtChoice, setYachtChoice] = useState(false)

    const nameInputRef = useRef()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        if (!nameInput.length) {
            return
        }

        setUserName(nameInput)
        setNameInput('')
        setYachtChoice(true)

    }

    const handleManualChoice = () => {
        setManualChoice(true)
        setYachtChoice(false)
    }

    const handleRandomChoice = () => {
        let yachts_to_server = false
        socket.emit('user:joined', userName, yachts_to_server, (result) => {
            setYachts(result.yachts)
            setWaiting(result.waiting)
        })

        navigate('/game')
    }

    return (
        <div>

            {!userName && <div className="form-container">
                <h1 className='mb-4'>{!userName && 'Please sign your name:'}</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 form-username" >
                        <Form.Control
                            id="input-username"
                            onChange={e => setNameInput(e.target.value)}
                            placeholder="Enter name here"
                            ref={nameInputRef}
                            required
                            type="text"
                            value={nameInput} />
                        <button className="button btn-gold" type="submit">Start the game</button>
                    </Form.Group>
                </Form>
            </div>
            }


            <Modal className='d-flex align-items-center text-center' show={yachtChoice}>
                <Modal.Body >
                    <p>Do you want to place yachts yourself or get them randomly?</p>

                    <div className='d-flex justify-content-between'>
                        <button className='button btn-gold' onClick={handleManualChoice}>Choose yachts manually</button>
                        <button className='button btn-gold' onClick={handleRandomChoice}>Get yachts randomly</button>
                    </div>
                </Modal.Body>
            </Modal>

            <ChooseYacht></ChooseYacht>

        </div >
    )
}

export default UserRegistration