import Game from '../components/Game'

const GamePage = ( {socket }) => {
    return (
        <div className="game-container">
            <Game socket={socket}/>
        </div>
        
    )
}

export default GamePage