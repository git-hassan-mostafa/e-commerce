import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import MainRoutes from './routes/MainRoutes'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './redux/userSlice'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import SideBar from './components/SideBar/SideBar'
import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main:'#17202A'
    },
    secondary: {
      main:'#EAECEE'
    }
  }
})

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    dispatch(fetchUser())
    if (location.pathname === '/') navigate('/home')
  }, [dispatch])



  return (
    <>
      <Header />
      <MainRoutes />

    </>
  )
}

export default App

