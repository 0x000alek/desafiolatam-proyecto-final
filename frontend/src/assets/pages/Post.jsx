import ProfileComponent from '../components/ProfileComponent'
import Swal from "sweetalert2"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from '../context/ProductContext'
import { UserContext } from '../context/UserContext'

const Post = () => {

    const { user, fetchUser } = useContext(UserContext)
    const { createProduct } = useContext(ProductContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        condition: "",
        category: "",
        price: "",
        stock: "",
        imageUrl: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { title, description, condition, price, stock, imageUrl } = formData

        if (!formData.title || !formData.description || !formData.condition || !formData.price || !formData.stock || !formData.imageUrl) {
            return Swal.fire({
                title: "Campos incompletos",
                text: "Debes rellenar todos los campos para publicar tu producto",
                icon: "warning"
            })
        }

        if (!title.trim() || !description.trim() || !condition.trim()) {
            return Swal.fire({
                title: "Campos vacíos",
                text: "No puedes dejar campos vacíos, por favor completa todos los campos",
                icon: "warning"
            })
        }

        if (isNaN(price) || Number(price) <= 0) {
            return Swal.fire({
                title: "Precio inválido",
                text: "El precio debe ser un número mayor a 0",
                icon: "error"
            });
        }

        if (isNaN(stock) || Number(stock) <= 0) {
            return Swal.fire({
                title: "Stock inválido",
                text: "El stock debe ser un número mayor a 0",
                icon: "error"
            });
        }

        if (title.length <= 2) {
            return Swal.fire({
                title: "Título muy corto",
                text: "El título debe tener más de 3 caracteres",
                icon: "warning"
            })
        }

        try {
            const isCreated = await createProduct(formData)
            if (isCreated) {
                fetchUser()
                Swal.fire({
                    title: "Publicación creada",
                    text: "tu publicación se ha creado correctamente",
                    icon: "success"
                })
                setFormData({
                    title: "",
                    description: "",
                    condition: "",
                    price: "",
                    stock: "",
                    imageUrl: "",
                    userEmail: user.email,
                    userName: user.name
                })
                navigate('/profile')
            }
        } catch (error) {
            console.error("Error al crear el producto:", error)
            Swal.fire({
                title: "Error al crear la publicación",
                text: "Por favor, intenta nuevamente más tarde",
                icon: "error"
            })
        }
    }
    return (
        <section id="section-pages" className="container-fluid">
            <div className="container">
                <ProfileComponent />
                <div>
                    <h2 className="text-center mb-4">Publicar</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row justify-content-center">
                            <div className="col-lg-6">

                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    type="text"
                                    className="form-control mb-3"
                                    id="titulo"
                                    placeholder="Título"
                                />

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="form-control mb-3"
                                    aria-label="With textarea"
                                    placeholder="Descripción">
                                </textarea>

                                <div className="input-group mb-3">
                                    <select
                                        name="condition"
                                        value={formData.condition}
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
                                        value={formData.price}
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
                                        value={formData.stock}
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
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        type="url"
                                        className="form-control"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary float-end">enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Post