import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Snackbar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { fetchData } from '../../hooks/hooks';

import iphone from '../../assets/iphone.jpg'
import { Link } from 'react-router-dom';

const CartComponent = ({data,refetch}) => {

    const date = new Date(data?.createdAt); // Convert the string to a Date object
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' }; // Define the format options

    const formattedDate = date.toLocaleDateString('en-US', options); // Format the date string according to the options
    const [open,setOpen]=useState(false)

    const {data:removeData,isLoading,refetch:removingRefetch}=useQuery(['delete',data],()=>fetchData(`/api/v1/product/cart/${data?.id}`,'DELETE'),{
        enabled:false
    })

    const ListStyle = {
        width: '100%',
        padding: '10px',
        maxWidth: '768px',
        bgcolor: 'background.paper',
        margin: 'auto',
        borderRadius: '10px',
      }
    
      const ListItemStyle = {
        color: '#17202A',
        gap: '20px'
      }

      const handleRemoveFromCart=async()=>{
        await removingRefetch();
        refetch()
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000);
      }
    return (
        <>
        <List className='listItem' key={data?.id} sx={ListStyle}>
        <ListItem  sx={ListItemStyle}>
          <ListItemAvatar >
          <Link className='link' to={`/products/product/${data?.product?.id}`} state={data?.product} >
            <Avatar sx={{
                width:'100px',
                height:'100px',
            }}
             src={`/${data?.product?.photo?.filename}`}
              />
              </Link>
          </ListItemAvatar>
          <Stack sx={{ display: 'block' }}>
            <ListItemText primary={data?.product?.title} secondary={`Ordered At ${formattedDate}`} />
            {/* <ListItemText secondary={`$${data?.product?.price}`} /> */}
            <p className='price'> ${data?.product?.price} </p>
            <h3 className="quantity"> {data?.quantity} items in you cart </h3>
          </Stack>
        </ListItem>
        <Stack direction={'column'} spacing={'10px'} >
          <LoadingButton onClick={handleRemoveFromCart} loading={isLoading} color='error' variant='contained' startIcon={<DeleteIcon />} className="delete-from-ordered-list">remove</LoadingButton>
        <Link className='link' to={`/products/product/${data?.product?.id}`} state={data?.product} >
          <LoadingButton color='primary'  className='more-details'>more details</LoadingButton>
        </Link>
        </Stack>
        
      </List>
      <Snackbar open={open} autoHideDuration={4000} >
        <Alert variant='filled' severity={removeData?.message?'success':'error'} sx={{ width: '100%' }}>
          {
            removeData?.message || removeData?.error
          }
        </Alert>
      </Snackbar>
        </>
      
    )
}

export default CartComponent
