import Footer from '../components/Footer'
import UserRegistration from '../components/UserRegistration'

const Home = ({ socket }) => {
    return (
        <div>
            <UserRegistration socket={socket} />
			<Footer />
        </div>

    )
}

export default Home