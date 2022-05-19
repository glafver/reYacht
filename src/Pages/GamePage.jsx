import Game from '../components/Game'

const GamePage = ( {socket }) => {
    return (
        <div className="container">
            <Game socket={socket}/>
        </div>
        
    )
}

export default GamePage