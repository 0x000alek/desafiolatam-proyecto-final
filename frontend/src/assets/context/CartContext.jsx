import { createContext, useEffect, useState } from "react"
import { getProductsService } from "../services/productService"
import { checkoutService } from "../services/checkoutService"
import { UserContext } from "./UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export const CartContext = createContext()

const CartProvider = ({ children }) => {

    const { user, token } = useContext(UserContext)
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const data = await getProductsService()
            setProducts(data)
            return data
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const [cart, setCart] = useState([])

    const addProduct = (p) => {
        console.log('Producto recibido:', p)
        setCart((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === p.id)
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id == p.id ? { ...item, count: item.count + 1 } : item
                )
            } else {
                Swal.fire({
                    title: "Producto agregado",
                    text: `${p.title} se agregó al carrito.`,
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false
                })
                return [...currentItems, { ...p, count: 1 }]
            }
        })
    }

    const subProduct = (id) => {
        setCart((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, count: item.count - 1 } : item
            ).filter((item) => item.count > 0)
        )
    }

    const calculoTotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.count, 0)
    }

    const vaciarCart = () => {
        setCart([])
    }

    const cartCount = () => {
        return cart.reduce((total, item) => total + item.count, 0)
    }

    const handleCheckout = async () => {

        if (!user || !token) {
            Swal.fire({
                title: "Oh oh",
                text: "Debes iniciar sesión para hacer tu compra",
                icon: "warning"
            })
            navigate('/login')
            return
        }

        if (cart.length === 0) {
            Swal.fire({
                title: "Carrito vacío",
                text: "No puedes comprar con el carrito vacío!",
                icon: "warning"
            })
            navigate('/repository')
            return
        }

        try {
            const data = await checkoutService(cart, token)
            console.log("Checkout data:", data)

            if (token) {
                Swal.fire({
                    title: "Compra exitosa!",
                    text: `Gracias por confiar en nosotros ${user?.name || user?.email}!`,
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false
                }).then(() => {
                    vaciarCart()
                })
                navigate('/')
            }
        } catch (error) {
            console.error("Error en el checkout", error)
            Swal.fire({
                title: "Error",
                text: "Hubo un problema con tu compra, puedes intentar nuevamente?",
                icon: "error"
            })
        }
    }

    const toggleProduct = (p) => {
        const exists = cart.find(item => item.id === p.id)

        if (exists) {
            subProduct(p.id)
            Swal.fire({
                title: "Producto eliminado",
                text: `${p.title} se eliminó del carrito`,
                icon: "warning",
                timer: 1800,
                showConfirmButton: false
            })
        } else {
            addProduct(p)
            Swal.fire({
                title: "Producto agregado",
                text: `${p.title} se agregó al carrito`,
                icon: "success",
                timer: 1800,
                showConfirmButton: false
            })
        }
    }

    const stateGlobalCart = {
        products,
        getProducts,
        cart,
        addProduct,
        subProduct,
        calculoTotal,
        vaciarCart,
        cartCount,
        handleCheckout,
        toggleProduct
    }

    return (
        <CartContext.Provider value={stateGlobalCart}>
            {children}
        </CartContext.Provider>
    )

}

export default CartProvider