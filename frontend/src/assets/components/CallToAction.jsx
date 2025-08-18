import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const CallToAction = () => {
    return (
        <section id="call-to-action" className="container-fluid">
            <div className="card-content">
                <h2>Compra y vende fácil!</h2>
                <h5 className="mb-4">Estás a solo un clic de unirte a wawita shop</h5>
                <Link to="/register"><Button>crear cuenta</Button></Link>
            </div>
        </section>
    )
}

export default CallToAction