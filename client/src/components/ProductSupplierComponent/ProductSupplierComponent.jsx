import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Avatar, List, ListItem, ListItemAvatar, ListItemText, Snackbar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchData } from '../../hooks/hooks';
import { BASE_URL } from '../../variables.env';

const ProductSupplierComponent = ({ data, refetch }) => {
    const date = new Date(data?.createdAt); // Convert the string to a Date object
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' }; // Define the format options

    const formattedDate = date.toLocaleDateString('en-US', options);

    const [open, setOpen] = useState(false)
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
        // display: 'flex',
        color: '#17202A',
        gap: '20px'
    }
    const { data: removeData, isFetching, refetch: removeRefetch } = useQuery(['remove-data', data], () => fetchData(`${BASE_URL}/api/v1/supplier/products/${data?.id}`, 'DELETE'), {
        enabled: false
    })

    const handleProductDelete = async () => {
        await removeRefetch();
        await refetch()
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000);
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
                            }}
                                src={`${BASE_URL}/${data?.photo?.filename}`}
                            />
                        </Link>
                    </ListItemAvatar>
                    <Stack sx={{ display: 'block' }}>
                        <ListItemText primary={data?.title} secondary={'added at ' + formattedDate} />
                        <p className='price'> ${data?.price} </p>
                        <h3 className="quantity"> {data?.quantity} items </h3>
                    </Stack>
                </ListItem>
                <Stack direction={'column'} spacing={'10px'} >
                    <LoadingButton onClick={handleProductDelete} loading={isFetching} color='error' variant='contained' startIcon={<DeleteIcon />} className="delete-from-ordered-list">remove</LoadingButton>
                    <Link className='link' to={`/products/product/${data?.id}`} state={data} >
                        <LoadingButton color='primary' className='more-details'>more details</LoadingButton>
                    </Link>
                </Stack>

            </List>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }} open={open} autoHideDuration={4000} >
                <Alert variant='filled' severity={removeData?.message ? 'success' : 'error'} sx={{ width: '100%' }}>
                    {
                        removeData?.message || removeData?.error
                    }
                </Alert>
            </Snackbar>
        </>
    )
}

export default ProductSupplierComponent
