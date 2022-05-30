import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import rules_1 from '../assets/images/rules_1.png'

const Navbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <nav className="navbar">
                <div className="game-container nav-container">
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
                        {/* Just like the tabletop game! Place your ships on the playing board. Your opponent will try to guess where your ships are. When it's your turn, try to guess where their ships are by choosing a tile on the opposing board. Try to sink all their battleships to win the game. */}
                        <p>1. First you need to enter your nickname.</p>
                        <p>2. Then you can choose whether you want to receive automatically generated ships or place them yourself on the playing field.</p>
                        <p>3. To place the ships manually just click on one of the ships, and then on the cell in the playing field.</p>
                        <img className='img-fluid' src={require('../assets/images/rules_2.png')} alt="" />
                        <p>4. After that, you will be on the playing field. Your opponent will try to guess where your ships are. When it's your turn, try to guess where their ships are by choosing a tile on the opposing board. Try to sink all their battleships to win the game.</p>
                        <img className='img-fluid' src={rules_1} alt="" />
                    </Modal.Body>
                </Modal>
            </nav>
        </>
    )
}

export default Navbar