import { FontAwesomeIcon, faFacebook, faInstagram, faWhatsapp, faBagShopping, faCircleUser } from '../icons/icons'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'

const Header = () => {
    const { user } = useContext(UserContext)
    const { cartCount } = useContext(CartContext)
    return (
        <section id="top-header" className="container-fluid">
            <div className="container">
                <div className="row justify-content-between align-items-center header-icon">
                    <div className="col-auto d-flex">
                        <a href="https://www.facebook.com/" target="_blank"><FontAwesomeIcon icon={faFacebook} className="fs-4 me-3" /></a>
                        <a href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon icon={faInstagram} className="fs-4 me-3" /></a>
                        <a href="https://wa.me/56953634165?text=Hola,%20quiero%20más%20información" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} className="fs-4" /></a>
                    </div>
                    <div className="col-auto d-inline-flex">
                        {user && (
                            <div className="header-user">Hola! {user?.fullname || user.email}</div>
                        )}
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">{user ? "Tu perfil" : "Inicia sesión"}</Tooltip>}>
                            <Link to={user ? "/profile" : "/login"}>
                                <FontAwesomeIcon icon={faCircleUser} className="fs-4" />
                            </Link>
                        </OverlayTrigger>
                        <span className='line'></span>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">Carrito</Tooltip>}>
                            <Link to="/cart"><FontAwesomeIcon icon={faBagShopping} className="fs-4" />
                                <span className="position-absolute translate-middle badge rounded-pill bg-danger">{cartCount()}</span>
                            </Link>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header