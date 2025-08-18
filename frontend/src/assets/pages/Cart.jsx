import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
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
                <h1>Carrito</h1>
                <div className="row justify-content-center">
                    <div className="col-xl-6 mb-xl-0 mb-5">
                        {cart.map((p) => (
                            <div key={p.id} className="row justify-content-sm-between align-items-center justify-content-center product-cart">
                                <div className="col-sm-3 col-4 mb-sm-0 mb-4">
                                    <img src={p.imageFile ? URL.createObjectURL(p.imageFile) : p.imageUrl} alt={p.title} className="img-fluid img-cart" />
                                </div>
                                <div className="col-lg-5 col-md-6 col-sm-5 col-8">
                                    <h4>{p.title}</h4>
                                    <h5>{formatPrice(p.price)}</h5>
                                    <p>{p.condition}</p>
                                </div>
                                <div className="col-xl-4 col-lg-3 col-md-3 col-sm-4 col-7">
                                    <div className="btn-group mb-4" role="group" aria-label="btn">
                                        <button onClick={() => subProduct(p.id)} type="button" className="btn btn-primary">-</button>
                                        <div className="d-flex"><div className="add-sub-cart">{p.count}</div></div>
                                        <button onClick={() => addProduct(p)} type="button" className="btn btn-primary">+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-xl-6">
                        <div className="card-cart">
                            <h5 className="text-center mb-4">Resumen del pedido</h5>
                            {/* <div className='d-flex justify-content-between mb-2'>
                                <span>Subtotal:</span>
                                <span>$99999</span>
                            </div>
                            <div className='d-flex justify-content-between mb-4'>
                                <span>Costo de envío:</span>
                                <span>$99999</span>
                            </div> */}
                            <div className="line-2"></div>
                            <div className='d-flex justify-content-between fw-bold mb-4'>
                                <span>Total: {new Intl.NumberFormat('es-CL', { currency: 'CLP', style: 'currency' }).format(calculoTotal())}</span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link to="/repository"><button type="button" className="btn btn-primary mx-2">Seguir comprando</button></Link>
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