import React, { memo, useEffect, useState } from 'react'
import iphone from '../../assets/iphone.jpg'
import Rating from '@mui/material/Rating';
import './FullProductCard.css'
import { useQuery } from 'react-query';
import { fetchData } from '../../hooks/hooks';
import { Link } from 'react-router-dom'
import { Alert, Button, Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const FullProductCard = ({ data }) => {
    const [open, setOpen] = useState(false)

    const { data: addToCartData, isLoading, refetch , isFetching } = useQuery([data, 'add-to-cart'], () => fetchData(`/api/v1/product/cart?id=${data?.id}`, 'POST'), {
        enabled: false
    })
    const addToCart = () => {
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000);
        refetch()
    }
    return (
        <article className='card-design'>
            <div className="discount-price">
                ${data?.discountPrice}
            </div>
            <div className="total-price">
                ${data?.price}
            </div>
            <img src={`http://localhost:8000/${data?.photo?.filename}`} alt="" />
            <h4> {data?.title.charAt(0).toUpperCase() + data?.title?.slice(1)} </h4>
            <p>{data?.description.slice(0,20)}...</p>
            <div className='product-rating-button' >
                <Rating style={{
                    fontSize: '20px'
                }} name="half-rating-read" defaultValue={data?.totalrating} precision={0.5} readOnly />
                    <Link onClick={()=>window.scrollTo(0,0)} className='link' to={`/products/product/${data?.id || data?.data?.id}`} state={data} >
                        <button> more info </button>
                    </Link>
            </div>


            <LoadingButton sx={{
                borderRadius: '0'
            }} loading={isFetching} variant='contained' onClick={addToCart} className="add-to-card">Add To Card</LoadingButton>
            {
                !isFetching && (addToCartData?.message || addToCartData?.error) && <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'right'}} open={open} autoHideDuration={4000} >
                    <Alert severity={addToCartData?.message ? 'success' : 'error'} sx={{ width: '100%' }}>

                        {
                            addToCartData?.message || addToCartData?.error
                        }
                    </Alert>
                </Snackbar>
            }

        </article>
    )
}

export default memo(FullProductCard) 
