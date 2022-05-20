import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import logo from '../assets/images/reYacht-logo.jpg'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const Navbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <nav className="navbar">
                <Link className="logo navbar-brand" to={'/'}>
                    <h1>Battle of the Yachts</h1>
                </Link>
                <button className="btn-gold" onClick={handleShow}>
                    Game instructions
                </button>

				{/* lägg i en egen component? */}
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