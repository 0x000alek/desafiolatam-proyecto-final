import ProfileComponent from '../components/ProfileComponent'
import CardProductRepo from '../components/CardProductRepo'
import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"

const Favs = () => {

    const { products } = useContext(ProductContext)
    const favoriteProducts = products.filter(p => p.isFavorite)

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <ProfileComponent />
                <div>
                    <h2 className="text-center mb-4">Mis favoritos</h2>
                    <div className="row justify-content-center">
                        <CardProductRepo products={favoriteProducts} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Favs