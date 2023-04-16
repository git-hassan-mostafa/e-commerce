import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';

import React from 'react';

import iphone from '../../assets/iphone.jpg';
import { Link } from 'react-router-dom'

const CategoryComponent = ({ data }) => {
  // console.log(data)
  const date = new Date(data?.createdAt); // Convert the string to a Date object
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' }; // Define the format options

  const formattedDate = date.toLocaleDateString('en-US', options); // Format the date string according to the options

  const ListStyle = {
    width: '100%',
    padding: '10px',
    maxWidth: '768px',
    bgcolor: 'background.paper',
    margin: 'auto',
    borderRadius: '10px',
    // display: 'flex',
    // alignItems: 'center'
  }

  const ListItemStyle = {
    display: 'flex',
    color: '#17202A',
    gap: '20px'
  }
  return (
    <>
      <List className='listItem' key={data?.id} sx={ListStyle}>
        <ListItem sx={ListItemStyle}>
          <ListItemAvatar >
            <Link className='link' to={`/products/product/${data?.id}`} state={data} >
              <Avatar sx={{
                width: '100px',
                height: '100px',
              }} src={`/${data?.photo?.filename}`} />
            </Link>
          </ListItemAvatar>
          <Stack sx={{ display: 'block' }}>
            <ListItemText primary={data?.title} secondary={`Ordered At ${formattedDate}`} />
            {/* <ListItemText secondary={`$${data?.product?.price}`} /> */}
            <p className='price'> ${data?.price} </p>
            <h3 className="quantity"> {data?.quantity} availaible item </h3>
          </Stack>
        </ListItem>
        <Link className='link' to={`/products/product/${data?.id}`} state={data} >
          <LoadingButton color='primary' variant='outlined' className='more-details'>more details</LoadingButton>
        </Link>
      </List>
    </>

  )
}

export default CategoryComponent
