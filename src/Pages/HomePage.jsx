import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
        <h1>Home</h1>
        <Link to="/game"><button>Link to game </button></Link>
        </div>
        
    )
}

export default Home