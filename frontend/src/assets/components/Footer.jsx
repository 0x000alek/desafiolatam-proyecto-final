import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import { FontAwesomeIcon, faFacebook, faInstagram, faWhatsapp } from '../icons/icons'
import Logo from '../images/logo.webp'

const Footer = () => {
    return (
        <footer className="container-fluid">
            <div className="container">
                <Link to="/"><Image src={Logo} className="logo-footer img-fluid mb-4" /></Link>
                <div className="row justify-content-center">
                    <div className="col-auto d-flex">
                        <a href="https://www.facebook.com/" target="_blank"><FontAwesomeIcon icon={faFacebook} className="fs-4 me-3 icon-footer" /></a>
                        <a href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon icon={faInstagram} className="fs-4 me-3 icon-footer" /></a>
                        <a href="https://wa.me/56953634165?text=Hola,%20quiero%20más%20información" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} className="fs-4 icon-footer" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer