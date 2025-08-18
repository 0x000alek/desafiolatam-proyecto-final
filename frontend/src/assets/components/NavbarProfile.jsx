import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

const NavbarProfile = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { user, handleLogOut } = useContext(UserContext)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <>
            <ListGroup>
                <ListGroup.Item as={Link} to="/profile" active={location.pathname === "/profile"}>
                    Mi perfil
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/post" active={location.pathname === "/post"}>
                    Publicar
                </ListGroup.Item>
                <ListGroup.Item as={Link} to="/favs" active={location.pathname === "/favs"}>
                    Mis favoritos
                </ListGroup.Item>
                <ListGroup.Item action onClick={handleLogOut}>
                    Cerrar sesión
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default NavbarProfile