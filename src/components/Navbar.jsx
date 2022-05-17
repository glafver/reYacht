import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom'
import logo from './Images/reYacht-logo.jpg'

const Navbar = () => {
    return (
    <div>
        <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to={'/'}>
                <img src={logo} width="70" height="70" alt=""></img>
            </Link>
        </nav>
    </div>
    )
}

export default Navbar