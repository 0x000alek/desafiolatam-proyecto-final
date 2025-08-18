import CardProductRepo from "../components/CardProductRepo"
import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"

const Repository = () => {

    const { products } = useContext(ProductContext)

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <h1>Productos</h1>
                <div className="row justify-content-center">
                    <CardProductRepo products={products} />
                </div>
            </div>
        </section>
    )
}

export default Repository