import socketio from 'socket.io-client'
import Game from './components/Game';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

const App = () => {
  return (
    <div className="container text-center">
      <Game socket={socket} />
    </div>
  )
}

export default App;

