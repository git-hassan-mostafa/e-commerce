import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Error from './Error/Error'
import Main from './main/Main'
import Login from '../components/login/Login'
import Register from './register/Register'
import Signup from '../components/signup/Signup'
import ProductsDetails from './productsDetails/ProductsDetails'
import Search from './search/Search'
import Profile from './profile/Profile'
import Cart from './cart/Cart'
import Orders from './orders/Orders'
import EditProfile from './editProfile/EditProfile'
import Category from './category/Category'
import SupplierProfile from './supplierProfile/SupplierProfile'
const MainRoutes = () => {
  return (
    <Routes >
      <Route path='/home' element={<Main />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/edit-profile' element={<EditProfile />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/profile/*' element={<Profile />} />
      <Route path='/profile/:id' element={<SupplierProfile />} />
      <Route path='/products/product/:id' element={<ProductsDetails />} />
      <Route path='/products/category/:category' element={<Category />} />
      <Route path='/products/search/:p' element={<Search />} />
      <Route path='/register' element={<Register />}>
        <Route index path='/register/login' element={<Login />} />
        <Route path='/register/signup' element={<Signup />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Routes>
  )
}

export default MainRoutes
