import ProfileImg from '../images/profile.png'
import NavbarProfile from './NavbarProfile'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const ProfileComponent = () => {
    const { user } = useContext(UserContext)
    return (
        <>
            <h1>Mi Perfil</h1>
            <div className="row justify-content-between">
                <div className="col-lg-6 col-md-8 mb-md-0 mb-4">
                    <div className="d-flex align-items-center justify-content-start">
                        <div><img src={user?.avatarUrl || ProfileImg} alt="Avatar" className='avatar-img img-fluid' /></div>
                        <div className="d-flex flex-column ms-4">
                            <h6>Hola! {user?.fullname || ''}</h6>
                            <h6>{user?.email ? `${user.email}` : ''}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4 mb-md-0 mb-4">
                    <NavbarProfile />
                </div>
            </div>
            <div className="line-2 mt-3"></div>
        </>
    )
}

export default ProfileComponent