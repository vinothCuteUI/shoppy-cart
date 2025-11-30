import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/homepage/HomePage'
import ProductDetails from './pages/Product/ProductDetails'
import CartPage from './pages/cart/CartPage'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './pages/auth/LoginPage'
import CheckOut from './pages/checkOut/CheckOut'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
        </Route>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='product-detail' element={<ProductDetails />} />
          <Route path='cart-items' element={<CartPage />} />
          <Route path='checkout' element={<CheckOut />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
