import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import logo from './Images/reYacht-logo.jpg'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const Navbar = () => {
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

    return (
    <div>
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to={'/'}>
                <img src={logo} width="70" height="70" alt=""></img>
            </Link>
        <Button variant="secondary" onClick={handleShow}>
            Game instructions
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Game instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Just like the tabletop game! Place your ships on the playing board. Your opponent will try to guess where your ships are. When it's your turn, try to guess where their ships are by choosing a tile on the opposing board. Try to sink all their battleships to win the game.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
        </Modal>
        </nav>
    </div>
    )
}

export default Navbar