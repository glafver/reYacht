import { Link } from 'react-router-dom'

const UserRegistration = () => {
    return (
        <div>
            <div className='d-flex flex-column vh-100 align-items-center'>
                <h1>Home</h1>
                <Link to="/game"><button>Link to game </button></Link>
            </div>
        </div>
    )
}

export default UserRegistration