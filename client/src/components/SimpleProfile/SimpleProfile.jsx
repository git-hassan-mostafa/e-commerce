import React from 'react'
import { useSelector } from 'react-redux'
import './simpleProfile.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaProductHunt } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { BASE_URL } from '../../variables.env'


const SimpleProfile = () => {
  const { user } = useSelector(state => state.user)
  return (
    <div className="container">
      <div className="profile-info">
        {
          user?.data?.photo?.filename ?
            <img src={`${BASE_URL}/${user?.data?.photo?.filename}`} alt="" />
            : <Avatar className='avatar'> {user?.data?.firstname?.charAt(0).toUpperCase()} </Avatar>
        }
        <div className="user-info">
          <h4> name : {user?.data?.firstname} {user?.data?.lastname} </h4>
          <h4> username: {user?.data?.username} </h4>
          <h4> email: {user?.data?.email} </h4>
          <Link className='link' to={`/cart`}> <AiOutlineShoppingCart className='icon' /> show my Cart </Link>
          <Link className='link' to={`/orders`}> <FaProductHunt className='icon' /> show my orders list </Link>

          {/* <Link className='link' to={'/edit-profile'} > <AiFillEdit className='icon' />  edit my profile </Link> */}
        </div>
      </div>
    </div>
  )
}

export default SimpleProfile