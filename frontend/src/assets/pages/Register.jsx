import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Register = () => {

    const { dataRegister, handleChangeRegister, handleSubmitRegister } = useContext(UserContext)

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <h1><span>Crea tu cuenta</span></h1>
                <div className="row justify-content-center border-form">
                    <div className="col-lg-12 p-5">
                        <form onSubmit={handleSubmitRegister}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label">Tu email</label>
                                        <input type="email" name="email" value={dataRegister.email} onChange={handleChangeRegister} className="form-control" id="email" placeholder="Ingresa tu email" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="form-label">Tu nombre</label>
                                        <input type="text" name="name" value={dataRegister.name} onChange={handleChangeRegister} className="form-control" id="alias" placeholder="Ingresa tu nombre" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">Tu Contraseña</label>
                                        <input type="password" name="password" value={dataRegister.password} onChange={handleChangeRegister} className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="confirmPassword" className="form-label">Repite tu Contraseña</label>
                                        <input type="password" name="confirmPassword" value={dataRegister.confirmPassword} onChange={handleChangeRegister} className="form-control" id="confirmPassword" placeholder="Ingresa tu contraseña" />
                                    </div>
                                    <button type="submit" className="btn btn-secondary float-lg-end">enviar</button>
                                </div>
                            </div>
                        </form>
                        <div className="clearfix pb-4"></div>
                        <p className='text-center'>¿Ya tienes cuenta con nosotros? ingresa <Link to="/login" className="fw-bold">AQUÍ</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register