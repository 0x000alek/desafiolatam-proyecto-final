import { login, register } from '../services/authService'
import { getUserProfile } from '../services/userServicce'
import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const navigate = useNavigate()

    // manejar el LogIn
    const [user, setUser] = useState(null) //datos usuario logueado
    const [logIn, setLogIn] = useState({ email: '', password: '' })

    const handleChangeLogIn = async (e) => {
        setLogIn({ ...logIn, [e.target.name]: e.target.value })
    }

    // autenticacion de usuario
    const auth = async (email, password) => {
        setLoading(true)
        try {
            const { data } = await login({ email, password })
            const { token } = data

            if (token) {
                localStorage.setItem('token', token) // token en el localStorage
                setToken(token)

                const { data: user } = await getUserProfile() // obtener datos del usuario
                setUser(user)
                console.log("user logueado:", user)
                console.log("token guardado:", token)
                return true // autenticación exitosa
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error",
                text: "Credenciales incorrectas, intenta nuevamente",
                icon: "error",
            })
            setLoading(false)
            return false
        } finally {
            setLoading(false)
        }
    }

    // submit login
    const handleSubmitLogIn = async (e) => {
        e.preventDefault()

        const success = await auth(logIn.email, logIn.password)

        if (success) {
            Swal.fire({
                title: "Ingreso exitoso",
                text: "Tu ingreso ha sido exitoso",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            })
            setLogIn({ email: '', password: '' })
            navigate('/profile')
        }
    }

    // perfil de usuario
    const fetchUser = async () => {
        try {
            const { data: user } = await getUserProfile()
            setUser(user)
        } catch (error) {
            console.error('Error al obtener usuario:', error)
            localStorage.removeItem('token')
            setUser(null)
        }
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            fetchUser()
        }
    }, [token])

    // manjear LogOut
    const handleLogOut = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        navigate('/')
        Swal.fire({
            title: "Sesión cerrada",
            text: "Cerraste sesión exisotamente",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        })
        console.log('Logout exitoso')
    }

    // manejar el Register
    const [dataRegister, setDataRegister] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const userRegister = async (email, name, password) => {
        try {
            const { data } = await register({ email, name, password })
            const { token } = data
            if (token) {
                localStorage.setItem('token', token)
                setToken(token)
                await fetchUser()
                Swal.fire({
                    title: `¡Te has registrado con éxito!`,
                    text: "Bienvenid@!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                })
                return true
            }
        } catch (error) {
            console.error('Error en el registro:', error)
            setError('Error al registrar el usuario')

            if (error.response && error.response.status === 409) {
                Swal.fire({
                    title: "Usuario ya registrado",
                    text: "Este correo ya está en uso, intenta con otro.",
                    icon: "warning",
                })
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al registrar tu cuenta. Intenta nuevamente.",
                    icon: "error",
                })
            }
            return false
        }
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault()

        const { name, email, password, confirmPassword } = dataRegister

        if (!email || !password || !name) {
            Swal.fire({
                title: "Oh oh!",
                text: "Debes ingresar tu nombre, email y contraseña, intenta nuevamente!",
                icon: "warning",
            })
            return
        }

        if (password !== confirmPassword) {
            Swal.fire({
                title: "Contraseñas no coinciden",
                text: "La confirmación no coincide con la contraseña.",
                icon: "warning",
            })
            return
        }

        if (name.length < 3) {
            Swal.fire({
                title: "Nombre demasiado corto",
                text: "El nombre debe tener al menos 3 caracteres.",
                icon: "warning",
            })
            return
        }

        if (password.length < 6) {
            Swal.fire({
                title: "Contraseña demasiado corta",
                text: "La contraseña debe tener al menos 6 caracteres.",
                icon: "warning",
            })
            return
        }

        const success = await userRegister(email, name, password)

        if (success) {
            setDataRegister({ name: '', email: '', password: '', confirmPassword: '' })
            navigate('/profile')
        }
    }

    const handleChangeRegister = (e) => {
        setDataRegister({ ...dataRegister, [e.target.name]: e.target.value })
    }

    const stateGlobalUser = {
        user,
        logIn,
        error,
        handleChangeLogIn,
        handleSubmitLogIn,
        dataRegister,
        handleChangeRegister,
        handleSubmitRegister,
        handleLogOut,
        token,
        loading,
        fetchUser
    }

    return (
        <UserContext.Provider value={stateGlobalUser}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider