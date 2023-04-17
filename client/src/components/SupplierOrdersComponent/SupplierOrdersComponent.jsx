import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { BASE_URL } from '../../variables.env';

const SupplierOrdersComponent = ({ data }) => {
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
    return (
        <>
            <List className='listItem' key={data?.id} sx={ListStyle}>
                <ListItem sx={ListItemStyle}>
                    <ListItemAvatar >
                        <Link className='link' to={`/products/product/${data?.product?.id}`} state={data?.product} >
                            <Avatar sx={{
                                width: '100px',
                                height: '100px',
                            }}
                                src={`${BASE_URL}/${data?.product?.photo?.filename}`}
                            />
                        </Link>
                    </ListItemAvatar>
                    <Stack sx={{ display: 'block' }}>
                        <ListItemText primary={data?.product?.title} secondary={'ordered at ' + formattedDate} />
                        <p className='price'> Total Price : ${data?.totalPrice} </p>
                        <h4> {data?.quantity} items ordered </h4>
                        <h5 className="quantity"><span> @{data?.user?.username} </span>  </h5>
                    </Stack>
                </ListItem>
                <Stack direction={'column'} spacing={'10px'} >
                    <Link className='link' to={`/products/product/${data?.product?.id}`} state={data?.product} >
                        <LoadingButton color='primary' className='more-details'>more details</LoadingButton>
                    </Link>
                </Stack>

            </List>
        </>
    )
}

export default SupplierOrdersComponent
