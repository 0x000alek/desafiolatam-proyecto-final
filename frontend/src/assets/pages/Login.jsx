import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

import babyLogin from '../images/baby-cart.jpg'

const Login = () => {

    const { logIn, handleChangeLogIn, handleSubmitLogIn } = useContext(UserContext)

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <div className="row justify-content-center border-form">
                    <div className="col-lg-6 p-0 order-lg-1 order-2">
                        <img src={babyLogin} alt="login-page" className="img-fluid w-100 baby-login" />
                    </div>
                    <div className="col-lg-6 p-5 order-lg-2 order-1">
                        <h1><span>Ingresa a tu perfil</span></h1>
                        <form onSubmit={handleSubmitLogIn}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Tu usuario</label>
                                <input type="email" name="email" value={logIn.email} onChange={handleChangeLogIn} className="form-control" id="email" placeholder="Ingresa tu email" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Tu Contraseña</label>
                                <input type="password" name="password" value={logIn.password} onChange={handleChangeLogIn} className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                            </div>
                            <button type="submit" className="btn btn-primary float-lg-end" disabled={!logIn.email || !logIn.password}>entrar</button>
                        </form>
                        <div className="clearfix pb-4"></div>
                        <p className='text-center'>¿No tienes cuenta? créala <Link to="/register" className="fw-bold">AQUÍ</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login