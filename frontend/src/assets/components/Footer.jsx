import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import Logo from '../images/logo.webp'

const Footer = () => {
    return (
        <footer>
            <Link to="/"><Image src={Logo} className="logo-footer img-fluid" /></Link>
        </footer>
    )
}

export default Footer