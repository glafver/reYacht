import UserRegistration from '../components/UserRegistration'
import { useGameContext } from '../Contexts/UserContext'

const Home = () => {
    const { socket } = useGameContext()
    return (
        <div>
            <UserRegistration socket={socket} />
        </div>

    )
}

export default Home