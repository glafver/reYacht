import Game from './Pages/GamePage'
import './App.css';
import './assets/scss/App.scss';
import 'bootstrap/dist/css/bootstrap.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/HomePage'

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

