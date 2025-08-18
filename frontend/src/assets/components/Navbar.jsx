import { Container, Nav, Navbar, Image } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

import Header from './Header'
import Logo from '../images/logo.webp'

const Navigation = () => {
    const { user, handleLogOut } = useContext(UserContext)
    return (
        <>
            <Header />
            <Navbar expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand><Link to="/"><Image src={Logo} /></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/" className="text-decoration-none"><div className="nav-link">Home</div></NavLink>
                            <NavLink to="/repository" className="text-decoration-none"><div className="nav-link">Productos</div></NavLink>
                            <NavLink to={user ? "/" : "/register"} onClick={user ? handleLogOut : ''} className="text-decoration-none"><div className="nav-link">{user ? "Cerrar Sesión" : "Crear Cuenta"}</div></NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation