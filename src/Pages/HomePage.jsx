import UserRegistration from '../components/UserRegistration'

const Home = ({ socket }) => {
    return (
        <div>
            <UserRegistration socket={socket} />
        </div>

    )
}

export default Home