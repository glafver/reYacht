import { useEffect, useState, useRef } from 'react'
import { Form, InputGroup, ListGroup } from 'react-bootstrap'
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
        <div className="chat-container">
            <h2 id="chatTitle">Talk to the enemy</h2>
            <Form className="chat-input-form" onSubmit={handleSubmit}>
                <InputGroup className="input-form-holder">
                    <Form.Control
                        id="inputChatMsg"
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Write your message here"
                        ref={messageRef}
                        required
                        type="text"
                        value={message}
                    />
                    <button className="button btn-gold" id="chat-btn" type="submit" disabled={!message.length}>Send</button>
                </InputGroup>
            </Form>

            <div>
                <ListGroup className="chatMsg-container" id="chatContainer">
                    {messages.map((message, index) => {
                        return (
                            <ListGroup.Item key={index} className={message.username === userName ? "my-msg" : "enemy-msg"}>
                                <span className="msg-holder">
                                    <p className="chat-username">{message.username}</p>
                                    <div className="chat-msg">{message.content}</div>
                                </span>
                            </ListGroup.Item>
                        )
                    }
                    ).reverse()}
                </ListGroup>
            </div>
        </div>
    )
}

export default ChatRoom
