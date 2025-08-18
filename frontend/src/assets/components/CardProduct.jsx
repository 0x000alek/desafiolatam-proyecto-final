import { Link } from 'react-router-dom'
import { FontAwesomeIcon, faBagShopping, faHeartSolid, faHeartRegular } from '../icons/icons'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ProductContext } from '../context/ProductContext'
import formatPrice from '../utils/formatPrice'

const CardProduct = () => {
    const { products, likeProduct } = useContext(ProductContext)
    const { addProduct } = useContext(CartContext)
    return (
        <>
            {products.slice(0, 3).map((p) => (
                <div key={p.id} className="col-lg-4 py-4">
                    <div className="product-card">
                        <div className="product-overlay"></div>
                        <div className="product-condition">{p.condition}</div>
                        <Link to={`/product/${p.id}`} className="text-decoration-none">
                            <div className="product-info">
                                <h2>{p.title}</h2>
                                <span>{formatPrice(p.price)}</span>
                            </div>
                        </Link>
                        <div className="product-appear">
                            <a href="#" onClick={(e) => {
                                e.preventDefault()
                                likeProduct(p.id)
                            }}>
                                <div className="box-appear-1">
                                    <FontAwesomeIcon icon={p.isFavorite ? faHeartSolid : faHeartRegular} className="fs-4" />
                                </div>
                            </a>
                            <div onClick={() => addProduct(p)} className="pointer">
                                <div className="box-appear-1">
                                    <FontAwesomeIcon icon={faBagShopping} className="fs-4" />
                                </div>
                            </div>
                        </div>
                        <img src={p.imageFile ? URL.createObjectURL(p.imageFile) : p.imageUrl} alt={p.title} className="product-img" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default CardProduct