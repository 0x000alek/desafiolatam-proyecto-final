import { Link, useParams } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon, faBagShopping, faHeartSolid, faHeartRegular } from '../icons/icons'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ProductContext } from '../context/ProductContext'
import formatPrice from '../utils/formatPrice'

const Product = () => {

    const { id } = useParams()
    const { addProduct } = useContext(CartContext)
    const { getProductById, likeProduct } = useContext(ProductContext)

    const [product, setProduct] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            const item = await getProductById(id)
            setProduct(item)
        }
        getProduct()
    }, [id, getProductById])

    if (!product) {
        return <p>cargando...</p>

    }
    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <h1>Productos</h1>
                <div className="row justify-content-center">
                    <div key={product.id} className="col-md-5 mb-md-0 mb-4">
                        <img src={product.imageUrl} alt={product.title} className="product-img img-fluid product-img-detail border-form" />
                    </div>
                    <div className="col-md-7 ps-md-4">
                        <div className="d-flex justify-content-between align-items-start">
                            <span className="condition-product-detail">{product.condition}</span>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">like me</Tooltip>}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault()
                                    likeProduct(product.id)
                                }}
                                    className="text-decoration-none text-dark">
                                    <FontAwesomeIcon icon={product.isFavorite ? faHeartSolid : faHeartRegular} className="icon-product-detail" />
                                </a>
                            </OverlayTrigger>
                        </div>
                        <h6 className="mb-3">Vendido por: <Link to={`/seller/${product.owner.id}`} className="text-decoration-none">{product.owner.name}</Link></h6>
                        <h4>{product.title}</h4>
                        <h5>{formatPrice(product.price)}</h5>
                        <p>{product.description}</p>
                        <p>Stock: {product.stock}</p>
                        <div className="mb-4">
                            <Link to="/repository" className="me-2">
                                <button className="btn btn-primary">
                                    volver
                                </button>
                            </Link>
                            <button onClick={() => addProduct(product)} className="btn btn-primary">
                                añadir al carrito <FontAwesomeIcon icon={faBagShopping} className="icon-product" />
                            </button>
                            {/* <div className="card-description">
								<h6>Características:</h6>
								<ul>
									<li>condición: usado</li>
									<li>color: azul</li>
									<li>uso: 6 meses</li>
								</ul>
							</div> */}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Product