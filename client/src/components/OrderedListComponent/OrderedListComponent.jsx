import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { fetchData } from '../../hooks/hooks';

import iphone from '../../assets/iphone.jpg'
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';

const OrderedListComponent = ({ data, refetch }) => {
  const date = new Date(data?.createdAt); // Convert the string to a Date object
  const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' }; // Define the format options

  const formattedDate = date.toLocaleDateString('en-US', options); // Format the date string according to the options
  const [open, setOpen] = useState(false)

  const { data: removeData, isLoading, refetch: removingRefetch } = useQuery(['delete', data], () => fetchData(`/api/v1/product/order/${data?.id}`, 'DELETE'), {
    enabled: false
  })

  const ListStyle = {
    width: '100%',
    padding: '10px',
    maxWidth: '768px',
    bgcolor: 'background.paper',
    margin: 'auto',
    borderRadius: '10px',
    // display: 'flex',
    // alignItems:'center'
  }

  const ListItemStyle = {
    display: 'flex',
    color: '#17202A',
    gap: '20px'
  }

  const handleRemoveFromOrderedList = async () => {
    await removingRefetch();
    refetch()
    setOpen(true)
    console.log(removeData?.message || removeData?.error)
  }
  return (
    <>
      <List className='listItem' key={data?.id} sx={ListStyle}>
        <ListItem sx={ListItemStyle}>
          <ListItemAvatar >
            <Link className='link' to={`/products/product/${data?.product?.id}`} state={data?.product} >
              <Avatar sx={{
                width: '100px',
                height: '100px',
              }} src={`/${data?.product?.photo?.filename}`} />
            </Link>
          </ListItemAvatar>
          <Box sx={{ display: 'block' }}>
            <ListItemText primary={data?.product?.title} secondary={`Ordered At ${formattedDate}`} />
            {/* <ListItemText secondary={`$${data?.product?.price}`} /> */}
            <p className='price'> ${data?.product?.price} </p>
            <h3 className="quantity"> {data?.quantity} items ordered </h3>
          </Box>
        </ListItem>
        <Stack direction={'column'} spacing={'10px'} >
          <LoadingButton onClick={handleRemoveFromOrderedList} loading={isLoading} color='error' variant='contained' startIcon={<DeleteIcon />} className="delete-from-ordered-list">remove</LoadingButton>
          <Link className='link' to={`/products/product/${data?.product?.id}`} state={data?.product} >
            <LoadingButton color='primary' variant='outlined' className='more-details'>more details</LoadingButton>
          </Link>
        </Stack>

      </List>
      <Snackbar open={open} autoHideDuration={4000} >
        <Alert variant='filled' severity={removeData?.message ? 'success' : 'error'} sx={{ width: '100%' }}>
          {
            removeData?.message || removeData?.error
          }
        </Alert>
      </Snackbar>
    </>

  )
}

export default OrderedListComponent
