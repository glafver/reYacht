import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'

const Navbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <Link className="logo navbar-brand" to={'/'}>
                        <h1>Battle of the Yachts</h1>
                    </Link>
                    <button className="button btn-gold" onClick={handleShow}>
                        Game instructions
                    </button>
                </div>

                {/* lägg i en egen component? */}
                <Modal id="modalDialog" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modalTitle">How to play</Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="modalContent">
                        Just like the tabletop game! Place your ships on the playing board. Your opponent will try to guess where your ships are. When it's your turn, try to guess where their ships are by choosing a tile on the opposing board. Try to sink all their battleships to win the game.
                    </Modal.Body>
                </Modal>
            </nav>
        </>
    )
}

export default Navbar