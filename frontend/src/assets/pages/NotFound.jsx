import { Link } from "react-router-dom"
import notFound from "../images/not-found.svg"

const NotFound = () => {
    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-4 col-lg-6 col-md-7 col-sm-6">
                        <h1 className="not-found">NOT FOUND</h1>
                        <img src={notFound} alt="Tiendita" className="img-not-found img-fluid" />
                    </div>
                    <div className="col-auto text-center">
                        <h2 className="mb-1 color-azul">WAWITA PERDIDA!</h2>
                        <h4 className="mb-4 color-azul">sigue por aquí:</h4>
                        <Link to="/"><button className="btn btn-secondary">HOME</button></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound