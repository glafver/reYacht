import Game from '../components/Game'

const GamePage = ( {socket }) => {
    return (
        <div>
            <Game socket={socket}/>
        </div>
        
    )
}

export default GamePage