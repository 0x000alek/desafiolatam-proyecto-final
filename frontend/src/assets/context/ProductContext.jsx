import { createContext, useState, useEffect } from "react"
import { getProductsService, createProductService, updateProductService, deleteProductService, getProductByIdService, likeProductService } from "../services/productService"
import { UserContext } from "./UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export const ProductContext = createContext()

const ProductProvider = ({ children }) => {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const { data } = await getProductsService()
            setProducts(data)
            return data
        } catch (error) {
            console.error(error.message)
        }
    }

    const getProductById = async (id) => {
        try {
            const { data } = await getProductByIdService(id)
            return data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    const createProduct = async (productData) => {
        try {
            await createProductService(productData)
            getProducts()
            return true
        } catch (error) {
            console.error(error)
        }
    }

    const updateProduct = async (id, productData) => {
        try {
            await updateProductService(id, productData)
            getProducts()
            return true
        } catch (error) {
            console.error(error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            await deleteProductService(id)
            getProducts()
            return true
        } catch (error) {
            console.error(error)
        }
    }

    const likeProduct = async (id) => {
        if (!user) {
            Swal.fire({
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para agregar tus favs',
                icon: 'warning',
                confirmButtonText: 'Iniciar sesión'
            }).then(() => {
                navigate('/login')
            })
            return
        }
        try {
            const { data: likedProduct } = await likeProductService(id)
            // Actualizar el estado local con el producto que retorna el backend
            getProducts()
            Swal.fire({
                icon: 'success',
                title: likedProduct.isFavorite ? `¡Agregado a tus favs!` : '¡Eliminado de tus favs!',
                showConfirmButton: false,
                timer: 1500
            })
            return likedProduct
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [user])

    const setGlobalPosts = {
        getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        likeProduct,
        products
    }

    return (
        <ProductContext.Provider value={setGlobalPosts}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider