import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { FontAwesomeIcon, faBagShopping } from '../icons/icons'
import formatPrice from '../utils/formatPrice'
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const Cart = () => {
    const { cart, addProduct, subProduct, calculoTotal, handleCheckout } = useContext(CartContext)
    const { user, token } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <h1>Carrito de Compras</h1>
                <div className="line-2 d-xl-none d-block"></div>
                <div className="row justify-content-center">
                    <div className="col-xl-6 mb-xl-0 mb-5">
                        {cart.length === 0 ? (
                            <div className="text-center">
                                <FontAwesomeIcon icon={faBagShopping} className="fs-1 mb-3 color-gray" />
                                <h2>Carrito VACÍO</h2>
                                <h4>Aún no has agregado artículos</h4>
                                <p>Pero sigue por aquí y te ayudamos a encontrar lo que necesites!</p>
                                <Link to="/repository"><button type="button" className="btn btn-primary mx-2">Ver todo</button></Link>
                            </div>
                        ) : (
                            cart.map((p) => (
                                <div key={p.id} className="row justify-content-sm-between align-items-center justify-content-center product-cart">
                                    <div className="col-sm-3 col-12 mb-sm-0 mb-4">
                                        <img src={p.imageUrl} alt={p.title} className="img-fluid img-cart" />
                                    </div>
                                    <div className="col-lg-5 col-md-6 col-sm-5 col-12 mb-sm-0 mb-4">
                                        <h4>{p.title}</h4>
                                        <h5>{formatPrice(p.price)}</h5>
                                        <Link to={`/product/${p.id}`}>
                                            <span className="badge rounded-pill text-bg-primary">ver detalle</span>
                                        </Link>
                                    </div>
                                    <div className="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-auto">
                                        <div className="btn-group mb-4" role="group" aria-label="btn">
                                            <button onClick={() => subProduct(p.id)} type="button" className="btn btn-primary">-</button>
                                            <div className="d-flex"><div className="add-sub-cart">{p.count}</div></div>
                                            <button onClick={() => addProduct(p)} type="button" className="btn btn-primary">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                        }
                    </div>
                    <div className="col-xl-6">
                        <div className="card-cart">
                            <h5 className="text-center mb-4">Resumen del pedido</h5>
                            <div className="line-2"></div>
                            <div className='d-flex justify-content-between fw-bold mb-4'>
                                <span>Total: {new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(calculoTotal())}</span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link to="/repository" className="text-decoration-none"><button type="button" className={`btn btn-primary mx-2 ${cart.length === 0 ? 'd-none' : 'd-block'}`}>Seguir comprando</button></Link>
                                <button
                                    type="button"
                                    className={`btn mx-2 ${user && token ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => {
                                        if (user && token) {
                                            handleCheckout()
                                        } else {
                                            navigate('/login')
                                        }
                                    }}>
                                    {user && token ? 'Pagar' : 'Iniciar sesión'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart