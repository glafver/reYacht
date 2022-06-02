import { useGameContext } from '../contexts/UserContext'
import { Button, Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GameRestart = () => {
    const navigate = useNavigate()

    const { socket, userName, results_message, setUserName, setOpponentName, setYachts, setShootTarget, setManualChoice, setIllustration, set_results_Message, gameEnd, setGameEnd, gameEndMsg, setGameEndMsg, disabled, setDisabled, yachtChoice, setYachtChoice } = useGameContext()

    const [ flicker, setFlicker ] = useState(false);

	const handleRestartGame = () => {
		console.log('wowww')
		socket.emit('game:end')
		for (let point of document.getElementsByClassName('board-cell')) {
			point.classList.remove('board_yacht', 'board_miss', 'board_my_yacht_miss', 'board_hit', 'board_killed', 'blocked', 'board_my_yacht_killed')
		}
		setUserName()
		setOpponentName()
		setYachts([])
		setGameEnd(false)
		setShootTarget()
		setManualChoice(false)
		// setIllustration(standard_seagull)
		set_results_Message('Welcome to game!')
		navigate('/')
	}

    const rematch = () => {
        if (disabled === false) {
            socket.emit('rematch:offer')
        } else {
            return
        }

        setYachtChoice(true)
    }

    const handleManualChoice = () => {
        setManualChoice(true)
        setYachtChoice(false)
    }

    const randomYachts = () => {
        socket.emit('random:yachts')
        setDisabled(true)
        setYachtChoice(false)
    }

    useEffect(() => {
    socket.on('rematch:requested', () => {
        console.log('hi')
        setFlicker(true)
    })

    socket.on('rematch:agreed', () => {
        setGameEnd(false)
        setFlicker(false)
        setDisabled(false)
        setYachtChoice(false)
        console.log('agreed')
    })

    }, [socket])

    return (
        <>
            {/* <div>{results_message}</div> */}
			<Modal id="restartModal" show={gameEnd}>
				<Modal.Body id="modalContentYachts">
					<div className='d-flex justify-content-center flex-column'>
						<h2>{gameEndMsg}</h2>

                        <div className='buttons-container'>
                            <Button variant='secondary' disabled={disabled} onClick={rematch} className={flicker ? 'flicker-rematch-button' : 'rematch-button'}>Rematch</Button>
                            {disabled && <span className='waiting-for-opponent-msg'>Rematch offer sent</span>}
                            <Button variant='secondary' className='new-opponent' onClick={handleRestartGame}>New opponent</Button>
                        </div>
					</div>

				</Modal.Body>
			</Modal>




            <Modal id="modalDialogYachts" show={yachtChoice}>
                <Modal.Body id="modalContentYachts">
                    <h2>Do you want to place yachts yourself or get them randomly?</h2>

                    <div className="btnPlaceYachts">
                        <button className="button btn-gold" onClick={handleManualChoice} >I'll place them myself</button>
                        <button className="button btn-gold" onClick={randomYachts} >Place them randomly for me</button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default GameRestart