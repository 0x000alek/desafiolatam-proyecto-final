import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserProfile } from "../services/userServicce"
import { FontAwesomeIcon, faEnvelope, faWhatsapp } from '../icons/icons'
import CardProductRepo from "../components/CardProductRepo"
import toldo from "../images/toldo.svg"

const SellerProfile = () => {

    const { id } = useParams()
    const [ seller, setSeller ] = useState({})

    // Filtramos productos del vendedor
    const myProducts = seller?.publications || []

    useEffect(() => {
        const getSellerProfile = async () => {
            const { data } = await getUserProfile(id)
            setSeller(data)
        }
        getSellerProfile()
    }, [])

    if (!seller) {
        return <p>cargando...</p>
    }

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <h1 className="mb-3">La Tiendita de {seller.fullname}</h1>
                <div>
                    <div className="text-center mb-4">
                        <h6>Puedes contactarme aquí: <a href={`mailto:${seller.email}`} className="text-decoration-none"> <FontAwesomeIcon icon={faEnvelope} className="icon-product mx-1" /> {seller.email}</a></h6>
                    </div>
                    <img src={toldo} alt="Tiendita" className="toldo" />
                    {myProducts.length === 0 ? (
                        <p className="text-center">El vendedor {seller.fullname} aún no tiene productos publicados</p>
                    ) : (
                        <div className="row justify-content-center">
                            <CardProductRepo products={myProducts} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default SellerProfile
