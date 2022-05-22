import { useEffect, useState, useRef } from 'react'
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useGameContext } from '../Contexts/UserContext'

const ChatRoom = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const { userName, socket } = useGameContext()
    const messageRef = useRef()

    const handleIncomingMessage = msg => {
        setMessages(prevMessages => [...prevMessages, msg])
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (!message.length) {
            return
        }

        const msg = {
            username: userName,
            content: message,
            timestamp: Date.now(),
        }

        socket.emit('chat:message', msg)

        setMessages(prevMessages =>
            [
                ...prevMessages,
                { ...msg, self: true }
            ]
        )

        setMessage('')
        messageRef.current.focus()
    }


    useEffect(() => {

        socket.on('chat:message', handleIncomingMessage)

    }, [socket])

    useEffect(() => {
        messageRef.current && messageRef.current.focus()
    }, [])

    return (
        <div className='my-5'>
            <div>
                <h2>Chat</h2>

                <div>
                    <ListGroup>
                        {messages.map((message, index) => {
                            const ts = new Date(message.timestamp)
                            const time = ts.toLocaleTimeString()
                            return (
                                <ListGroup.Item key={index}>
                                    <span>{time} </span>
                                    <span><b> {message.username}: </b> </span>
                                    <span>{message.content}</span>
                                </ListGroup.Item>
                            )
                        }
                        )}
                    </ListGroup>
                </div>

                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Control
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Let's chat!"
                            ref={messageRef}
                            required
                            type="text"
                            value={message}
                        />
                        <Button variant="success" type="submit" disabled={!message.length}>Send</Button>
                    </InputGroup>
                </Form>
            </div>
        </div>
    )
}

export default ChatRoom
