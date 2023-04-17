import { Avatar, Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaProductHunt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import AddProduct from '../addProduct/AddProduct';
import SupplierProducts from '../SupplierProducts/SupplierProducts';
import SupplierOrdersComponent from '../SupplierOrdersComponent/SupplierOrdersComponent';
import SupplierProductsOrders from '../SupplierProductsOrders/SupplierProductsOrders';
import { BASE_URL } from '../../variables.env';


const SupplierOwnProfile = () => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { user } = useSelector(state => state?.user)
  return (
    <div className='container'>
      {/* <div className="container"> */}
      <div className="profile-info">
        {
          user?.data?.photo?.filename ?
            <img src={`${BASE_URL}/${user?.data?.photo?.filename}`} alt="" />
            : <Avatar className='avatar'> {user?.data?.firstname?.charAt(0).toUpperCase()} </Avatar>
        }        <div className="user-info">
          <h4> name : {user?.data?.firstname} {user?.data?.lastname} </h4>
          <h4> username: {user?.data?.username} </h4>
          <h4> email: {user?.data?.email} </h4>
          <Link className='link' to={`/cart`}> <AiOutlineShoppingCart className='icon' /> show my Cart </Link>
          <Link className='link' to={`/orders`}> <FaProductHunt className='icon' /> show my orders list </Link>

          {/* <Link className='link' to={'/edit-profile'} > <AiFillEdit className='icon' />  edit my profile </Link> */}
        </div>
      </div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: '0', zIndex: '10' }}>
            <TabList variant='fullWidth' scrollButtons onChange={handleChange} aria-label="basic tabs example">
              <Tab label="add product" value='0' />
              <Tab label="show all products" value='1' />
              <Tab label="show all orders" value='2' />
            </TabList>
          </Box>
          <TabPanel value="0">
            <AddProduct />
          </TabPanel>
          <TabPanel value='1'>
            <SupplierProducts />
          </TabPanel>
          <TabPanel value='2'>
            <SupplierProductsOrders />
          </TabPanel>
        </TabContext>
      </Box>
    </div >
  )
}

export default SupplierOwnProfile
