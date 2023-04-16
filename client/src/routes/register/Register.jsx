import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'
import register from '../../assets/register.avif'
import './register.css'
const Register = () => {
    const navLinkStyle = ({ isActive }) => {
        return {
            padding: '10px',
            backgroundColor: isActive ? '#17202A' : '#EAECEE',
            color: isActive ? '#EAECEE' : '#17202A',
            textDecoration: 'none',
            width: '50%',
            border: '1px solid #17202A',
            // borderRadius: '20px'
        }

    }
    const { user } = useSelector(state => state.user);
    return (
        <>
        {user?.data&& <Navigate to={'/'} />}
            <div className="container">
                <div className='register'>
                    <img src={register} alt="" />
                    <div className="auth_page">
                        <div className="nav_links">
                            <NavLink style={navLinkStyle} to={'/register/login'} >login</NavLink>
                            <NavLink style={navLinkStyle} to={'/register/signup'} >signup</NavLink>
                        </div>
                        <Outlet />
                    </div>

                </div>
            </div>
        </>


    )
}

export default Register
