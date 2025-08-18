import { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { UserContext } from '../context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import formatPrice from '../utils/formatPrice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPencil } from '../icons/icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import ProfileComponent from '../components/ProfileComponent'

const Profile = () => {

    const { deleteProduct } = useContext(ProductContext)
    const { user, loading, fetchUser } = useContext(UserContext)
    const navigate = useNavigate()

    // Filtrar solo productos del usuario logueado
    const myProducts = user?.publications || []

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    const handleDelete = async (id) => {
        const isDeleted = await deleteProduct(id)
        if (isDeleted) {
            fetchUser()
            Swal.fire({
                title: "Producto eliminado",
                text: "El producto se eliminó correctamente",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            })
        }
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border" role="status"></div>
            </div>
        )
    }

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <ProfileComponent />
                <div>
                    <h2 className="text-center mb-4">Mis publicaciones</h2>
                    {myProducts.length === 0 ? (
                        <p className="text-center">No tienes productos publicados aún.</p>
                    ) : (
                        <div className="row justify-content-center">
                            {myProducts.map((p) => (
                                <div key={p.id} className="row justify-content-sm-between justify-content-center mb-4 border-form py-3">
                                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 mb-lg-0 mb-4">
                                        <img
                                            src={p.imageUrl}
                                            alt={p.title}
                                            className="img-fluid product-img-profile"
                                        />
                                    </div>
                                    <div className="col-lg-3 col-md-5 col-sm-8 mb-sm-0 mb-4">
                                        <h6>{p.title}</h6>
                                        <h6><span className="fw-bold">ID:</span> {p.id}</h6>
                                        <h6><span className="fw-bold">Condición:</span> {p.condition}</h6>
                                        <h6><span className="fw-bold">Stock:</span> {p.stock}</h6>
                                        <Link to={`/product/${p.id}`}>
                                            <span className="badge rounded-pill text-bg-primary">ver detalle</span>
                                        </Link>
                                    </div>
                                    <div className="col order-lg-3 order-4">
                                        <h6><span className="fw-bold">Precio:</span> {formatPrice(p.price)}</h6>
                                        <h6><span className="fw-bold">Descripción: </span></h6>
                                        <p className="small">{p.description}</p>
                                    </div>
                                    <div className="col-sm-auto order-lg-4 order-3 mb-md-0 mb-4 text-sm-end text-center">
                                        <Link to={`/update/${p.id}`}>
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">editar</Tooltip>}>
                                                <button className="btn btn-secondary mx-2">
                                                    <FontAwesomeIcon icon={faPencil} className="icon-product" />
                                                </button>
                                            </OverlayTrigger>
                                        </Link>
                                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-login">eliminar</Tooltip>}>
                                            <button onClick={() => handleDelete(p.id)} className="btn btn-secondary mx-2">
                                                <FontAwesomeIcon icon={faXmark} className="icon-product" />
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Profile