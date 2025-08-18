import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProvider from './assets/context/UserContext'
import CartProvider from './assets/context/CartContext'
import ProductProvider from './assets/context/ProductContext'

import Navigation from "./assets/components/Navbar"
import Home from "./assets/pages/Home"
import Footer from './assets/components/Footer'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Cart from './assets/pages/Cart'
import Repository from './assets/pages/Repository'
import Product from './assets/pages/Product'
import Profile from './assets/pages/Profile'
import SellerProfile from './assets/pages/SellerProfile'
import Post from './assets/pages/Post'
import Favs from './assets/pages/Favs'
import Update from './assets/pages/Update'
import NotFound from './assets/pages/NotFound'

import '../src/assets/css/variables.css'
import '../src/assets/css/alerts.css'

const App = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <CartProvider>
                    <Navigation />
                    <ProductProvider>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/product/:id" element={<Product />} />
                            <Route path="/repository" element={<Repository />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/seller/:id" element={<SellerProfile />} />
                            <Route path="/post" element={<Post />} />
                            <Route path="/favs" element={<Favs />} />
                            <Route path="/update/:id" element={<Update />} />
                            <Route path="/*" element={<NotFound />} />
                        </Routes>
                    </ProductProvider>
                </CartProvider>
            </UserProvider>
            <Footer />
        </BrowserRouter>
    )
}

export default App