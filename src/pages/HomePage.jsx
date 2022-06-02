import Footer from '../components/Footer'
import UserRegistration from '../components/UserRegistration'

/* import boat from '../assets/images/bg-boat.svg' */

const Home = () => {
    return (
        <div>
            {/* <div className="boat moveBoat"><img src={boat} alt="boat"/></div> */}
            <UserRegistration />
            <Footer />
        </div>

    )
}

export default Home