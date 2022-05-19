import socketio from 'socket.io-client'
import Game from './Pages/GamePage'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/HomePage'

const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL)

const App = () => {
  return (
    <div className="text-center">
      <Navbar />
      <Routes>
        <Route path="/game" element={<Game socket={socket} />}></Route>
        <Route path="/" element={<Home socket={socket} />}></Route>
      </Routes>
    </div>
  )
}

export default App;

