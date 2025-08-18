import ProfileComponent from '../components/ProfileComponent'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from '../context/ProductContext'
import { UserContext } from '../context/UserContext'
import Swal from "sweetalert2"

const Update = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { getProductById, updateProduct } = useContext(ProductContext)
    const { fetchUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        condition: "",
        price: "",
        stock: "",
        imageUrl: ""
    })

    useEffect(() => {
        const loadProduct = async () => {
            const product = await getProductById(id)
            if (product) {
                setFormData({
                    title: product.title,
                    description: product.description,
                    condition: product.condition,
                    price: product.price,
                    stock: product.stock,
                    imageUrl: product.imageUrl || ""
                })
            }
        }
        loadProduct()
    }, [id, getProductById])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData({
            ...formData,
            [name]: files && files.length > 0 ? files[0] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { title, description, condition, price, stock, imageFile, imageUrl } = formData

        if (!title || !description || !condition || !price || !stock) {
            return Swal.fire({
                title: "Campos incompletos",
                text: "Debes rellenar todos los campos para editar tu producto",
                icon: "warning"
            })
        }

        if (!imageFile && !imageUrl.trim()) {
            return Swal.fire({
                title: "Imagen faltante",
                text: "Debes subir una imagen o ingresar una URL válida",
                icon: "warning"
            })
        }

        const isUpdated = await updateProduct(id, formData)
        if (isUpdated) {
            fetchUser()
            Swal.fire({
                title: "Publicación editada",
                text: "Tu publicación se ha actualizado correctamente",
                icon: "success"
            })

            console.log("Datos listos para enviar al backend (editar):", formData)

            navigate('/profile')
        }
    }

    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <ProfileComponent />
                <div>
                    <h2 className="text-center mb-4">Editar producto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-lg-6">

                                <input
                                    name="title"
                                    value={formData.title ?? ""}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control mb-3"
                                    id="titulo"
                                    placeholder="Título"
                                />

                                <textarea
                                    name="description"
                                    value={formData.description ?? ""}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    aria-label="With textarea"
                                    placeholder="Descripción">
                                </textarea>

                                <div className="input-group mb-3">
                                    <select
                                        name="condition"
                                        value={formData.condition ?? ""}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="" disabled>Condición</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Usado">Usado</option>
                                    </select>
                                </div>

                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Precio</span>
                                    <input
                                        name="price"
                                        value={formData.price ?? ""}
                                        onChange={handleChange}
                                        type="number"
                                        className="form-control"
                                        aria-label="price"
                                        placeholder="9999"
                                    />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Stock</span>
                                    <input
                                        name="stock"
                                        value={formData.stock ?? ""}
                                        onChange={handleChange}
                                        type="number"
                                        className="form-control"
                                        aria-label="stock"
                                        placeholder="1"
                                    />
                                </div>

                                {/* <div className="form-text mb-3" id="basic-addon4">Puedes subir ó ingresar URL de la imagen</div>

                                <div className="input-group mb-3">
                                    <input
                                        name="imageFile"
                                        onChange={handleChange}
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                    />
                                </div> */}

                                <div className="input-group">
                                    <span className="input-group-text">URL</span>
                                    <input
                                        name="imageUrl"
                                        value={formData.imageUrl ?? ""}
                                        onChange={handleChange}
                                        type="url"
                                        className="form-control"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                </div>

                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary float-end">editar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Update