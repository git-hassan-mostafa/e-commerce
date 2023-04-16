import React from 'react'
import { useSelector } from 'react-redux'
import './profile.css'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FaProductHunt} from 'react-icons/fa'
import {AiFillEdit} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import SimpleProfile from '../../components/SimpleProfile/SimpleProfile'
import SupplierProfile from '../../components/supplierOwnProfile/SupplierOwnProfile'
import ProgressCircule from '../../components/progressCircule/ProgressCircule'


const Profile = () => {
    const {user}= useSelector(state=>state.user)
  return (
    <>
    {user?.data?
      user?.data?.supplier
      ?
      <SupplierProfile />
      :
       <SimpleProfile />
       :<ProgressCircule />
    }
    
    </>
  )
}

export default Profile
