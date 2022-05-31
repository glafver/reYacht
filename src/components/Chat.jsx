import { useEffect, useState, useRef } from 'react'
import { Button, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useGameContext } from '../contexts/UserContext'

const ChatRoom = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const { userName, socket } = useGameContext()
    const messageRef = useRef()


    let chatbox = document.querySelector(".chat-container")

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
            // timestamp: Date.now(),
        }

        socket.emit('chat:message', msg)

        setMessages(prevMessages => [...prevMessages, { ...msg }])

        setMessage('')
        messageRef.current.focus()
        chatbox.scrollIntoView({ block: "end" })

    }


    useEffect(() => {

        socket.on('chat:message', handleIncomingMessage)

    }, [socket])


    return (
        <div className='my-5'>
            <div>
                <h2>Chat</h2>

                <Form className="chat-input-form" onSubmit={handleSubmit}>
                    <InputGroup className="input-form-holder">
                        <Form.Control
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Write something to your enemy"
                            ref={messageRef}
                            required
                            type="text"
                            value={message}
                        />
                        <Button variant="success" type="submit" disabled={!message.length}>Send</Button>
                    </InputGroup>
                </Form>

                <div>
                    <ListGroup className="chat-container" id="chatContainer">
                        {messages.map((message, index) => {

                            return (

                                <ListGroup.Item key={index} className={message.username === userName ? "my-msg" : "enemy-msg"}>
                                    <span className='chat-type'><b> {message.username}:&#160;&#160; </b> </span>
                                    <span className='chat-type font-weight-light'> {message.content}</span>
                                </ListGroup.Item>

                            )
                        }
                        ).reverse()}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom
