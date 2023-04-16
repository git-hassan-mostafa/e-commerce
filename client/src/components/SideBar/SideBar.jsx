import React, { useState } from 'react'
import './SideBar.css'
import { BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, logout } from '../../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { togglingSideBar } from '../../redux/stateSlice'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FaProductHunt} from 'react-icons/fa'
import Avatar from '@mui/material/Avatar';
const SideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        document.cookie = 'access_token=""'    
        dispatch(fetchUser())
        navigate('/home')
        dispatch(togglingSideBar())
    }
    const {user}=useSelector(state=>state.user)
    return (
        <div>
            <div className={"main_box"}>
                <input type="checkbox" id="check" />
                <div className="btn_one">
                    <label>
                        <i className="fas fa-bars"></i>
                    </label>
                </div>
                <div className={'sidebar_menu'} >
                    <div className="logo">
                        <Link className='link' onClick={()=>dispatch(togglingSideBar())} to={'/home'}>E-Commerce</Link>
                    </div>
                    <div className="btn_two">
                        <label >
                            <i className="fas fa-times"></i>
                        </label>
                    </div>
                    <div className="menu">
                        <ul>

                            <Link onClick={()=>dispatch(togglingSideBar())} className='link' to={'/profile'}>
                                <li>
                                    {/* <CgProfile className='icon' /> */}
                                    {
                                        user?.data?.photo?.filename ?
                                         <img src={`/${user?.data?.photo?.filename}`} alt="" />
                                         : <Avatar> {user?.data?.firstname?.charAt(0).toUpperCase()} </Avatar>
                                    }
                                    
                                    <p title={user?.data?.email}> {user?.data?.email.slice(0,10)}... </p>      
                                </li>
                            </Link>
                            <Link onClick={()=>dispatch(togglingSideBar())} className='link' to={'/cart'}>
                                <li>
                                    {/* <CgProfile className='icon' /> */}
                                    <AiOutlineShoppingCart className='icon' />
                                    <p> CART</p>      
                                </li>
                            </Link>
                            <Link onClick={()=>dispatch(togglingSideBar())} className='link' to={'/orders'}>
                                <li>
                                    {/* <CgProfile className='icon' /> */}
                                    <FaProductHunt className='icon' />
                                    <p> ORDERS</p>      
                                </li>
                            </Link>


                            <li onClick={handleLogout}><BiLogOut className='icon' />
                                logout
                            </li>
                        </ul>
                    </div>
                    <div className="social_media">
                        <ul>
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-youtube"></i></a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SideBar
