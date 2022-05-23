import './App.css';
import './assets/scss/App.scss';
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Game from './pages/GamePage'
import Home from './pages/HomePage'

const App = () => {
	return (
		<div className="text-center">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/game" element={<Game />}></Route>
			</Routes>
		</div>
	)
}

export default App;

