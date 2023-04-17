import React, { memo, useEffect, useMemo, useState } from 'react';
import './productsDetails.css';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/autoplay';
import { Link, useLocation } from 'react-router-dom';
import { FaShippingFast } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Alert, Button, CircularProgress, Rating } from '@mui/material';
import { Navigation } from 'swiper';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { MdDeliveryDining } from 'react-icons/md';
import { MdProductionQuantityLimits, MdOutlinePriceCheck } from 'react-icons/md';
import iphone from '../../assets/iphone.jpg'
import { fetchData } from '../../hooks/hooks';
import { Stack } from '@mui/system';
import { AiFillStar } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import LoadingButton from '@mui/lab/LoadingButton';
import { useQuery } from 'react-query';
import FullProductCard from '../../components/fullProductCard/FullProductCard';
import { BASE_URL } from '../../variables.env';

// import required modules
const MemoizedRating = memo(Rating);

const ProductDetails = () => {
    const { state } = useLocation()
    const [quantity, setQuantity] = useState(1)
    const [ratingValue, setRatingValue] = useState(state?.totalrating)

    const [showRatingMessage, setShowRatingMessage] = useState(false);
    const [showCartMessage, setShowCartMessage] = useState(false);
    const [showBuyMessage, setShowBuyMessage] = useState(false);

    const [slideNum, setSlideNum] = useState(window.innerWidth / 250)
    useEffect(() => {
        window.addEventListener('resize', (e) => {
            if (e.target.innerWidth < 300) setSlideNum(1)
            setSlideNum(e.target.innerWidth / 250)
        })
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const { data, isLoading } = useQuery([state, 'suggested'], () => fetchData(`${BASE_URL}/api/v1/products?category=${state?.category}&page=1`))

    const fileredData = data?.data?.filter(data => data?.id !== state?.id)

    // for buy now 
    const { data: buyData, isLoading: buyIsLoading, refetch: buyRefetch, isFetching: buyIsFetching } = useQuery([state, 'buy'],
        () => fetchData(`${BASE_URL}/api/v1/product/order?quantity=${quantity}&id=${state?._id}`, 'POST'), {
        enabled: false
    })

    // for add to cart
    const { data: cartData, isLoading: cartIsLoading, refetch: cartRefetch, isFetching: cartIsFetching } = useQuery([state, 'cart'],
        () => fetchData(`${BASE_URL}/api/v1/product/cart?id=${state?.id}`, 'POST'), {
        enabled: false
    })

    //for rating 
    const { data: ratingData, isLoading: ratingIsLoading, refetch: ratingRefetch, isFetching: ratingIsFetching } = useQuery([state, 'rating'],
        () => fetchData(`${BASE_URL}/api/v1/products/${state._id}/rating`, 'PATCH', { rating: ratingValue }), {
        enabled: false
    })

    const handleQuantityChange = (e) => {
        if (e === 'plus') setQuantity(prev => prev + 1)
        else if (e === 'minus') setQuantity(prev => prev - 1)
    }

    const addToCart = async () => {
        await cartRefetch();
        setShowCartMessage(true)
        setTimeout(() => {
            setShowCartMessage(false)
        }, 3000)
    }

    const BuyNow = async () => {
        await buyRefetch()
        setShowBuyMessage(true)
        setTimeout(() => {
            setShowBuyMessage(false)
        }, 3000)
    }

    const handleRateSubmit = async () => {
        await ratingRefetch()
        setShowRatingMessage(true)
        setTimeout(() => {
            setShowRatingMessage(false)
        }, 3000)
    }
    return (
        <div className="container">
            <div className="productSwiperContainer">
                <Swiper navigation={true} slidesPerView={1} modules={[Navigation]} className="mySwiper">
                    {
                        state?.images?.map(image => (
                            <SwiperSlide key={`${BASE_URL}/${image?.filename}`} >
                                <img className='image-swiper' src={`${BASE_URL}/${image?.filename}`} alt="" />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
            <section className='product-details'>
                <div className="product-image">
                    <img src={`${BASE_URL}/${state?.photo?.filename}`} alt="" />
                </div>
                <div className="product-info">
                    <h2> {state?.title?.toUpperCase()} </h2>
                    <h3> {state?.category?.toUpperCase()} </h3>
                    <h1 className='price'> <MdOutlinePriceCheck className='icon' /> <span> ${state?.discountPrice} </span> &nbsp;&nbsp; <span> ${state?.price} </span> </h1>
                    <h4> <MdDeliveryDining className='icon' /> delivery in lebanon</h4>
                    <h4><FaShippingFast className='icon' /> fast shipping </h4>
                    <h4> <MdProductionQuantityLimits className='icon' /> available quantity : <span> {state?.quantity} </span>  </h4>
                    <h4 className='quantity'>
                        quantity
                        <span className="change-quantity">
                            <AiOutlineMinus className='icon' onClick={() => handleQuantityChange('minus')} />
                            <span> {quantity} </span>
                            <AiOutlinePlus className='icon' onClick={() => handleQuantityChange('plus')} />
                        </span>

                    </h4>
                    <h4> supplier : <Link className='supplier-link' state={state?.addedBy} to={`/profile/${state.addedBy.id}`} >
                        {state?.addedBy?.username}
                    </Link>  </h4>
                    <div className="product-buttons">
                        <LoadingButton sx={{
                            color: '#17202A'
                        }} loadingIndicator={
                            <CircularProgress sx={{
                                fontSize: '2px',
                                color: '#17202A'
                            }} />
                        } loading={cartIsLoading || cartIsFetching} onClick={addToCart} variant="contained">
                            add to cart
                        </LoadingButton>
                        {
                            showCartMessage && cartData && <Alert variant='filled' severity={cartData?.message ? 'success' : 'error'}> {
                                cartData?.message || cartData?.error
                            } </Alert>
                        }
                        <LoadingButton loadingIndicator={
                            <CircularProgress sx={{
                                fontSize: '2px',
                                color: 'white'
                            }} />
                        } loading={buyIsLoading || buyIsFetching} onClick={BuyNow} variant="contained">
                            buy now
                        </LoadingButton>
                        {
                            showBuyMessage && buyData && <Alert variant='filled' severity={buyData?.message ? 'success' : 'error'}> {
                                buyData?.message || buyData?.error
                            } </Alert>
                        }
                    </div>

                </div>

            </section>
            <h1 className='back-color'> description </h1>
            <p className='back-color'>{state?.description}</p>

            <h1 className='back-color'>Rating</h1>
            <MemoizedRating style={{
                fontSize: '20px'
            }}
                readOnly
                value={state?.totalrating} precision={0.5} /> <br />
            <div> <AiFillStar /> {state?.totalrating} stars </div>
            <div> <BsFillPeopleFill /> {state?.ratingNumber} people rated this product </div>


            <br />
            <br />
            <br />

            <h1 className="back-color">Rate our product</h1>
            <Stack className='rating-field' spacing={'20px'} alignItems={'center'} direction={'row'} >

                <Rating style={{
                    fontSize: '30px'
                }}
                    onChange={(e, value) => setRatingValue(value)}
                    value={ratingValue} precision={0.5} />

                <LoadingButton loading={ratingIsLoading || ratingIsFetching} onClick={handleRateSubmit} className='rating-button' variant='contained' >
                    submit
                </LoadingButton>
            </Stack>
            <br />
            {
                    showRatingMessage && ratingData && <Alert variant='filled' severity={ratingData?.message ? 'success' : 'error'}> {
                        ratingData?.message || ratingData?.error
                    } </Alert>
                }

            {
                fileredData?.length > 0 && <div className='suggested-product'>
                    <h1>MORE PRODUCTS LIKE THIS</h1>

                    {
                        isLoading ?
                            <div className="circular-progress">
                                <CircularProgress />
                            </div> :
                            <Swiper navigation={true} spaceBetween={10} slidesPerView={slideNum.toFixed(0)} modules={[Navigation]} className="mySwiper">
                                {
                                    fileredData?.map((data, i) => <SwiperSlide key={i}>
                                        <FullProductCard {...{ data }} />
                                    </SwiperSlide>).slice(0, 10)
                                }
                            </Swiper>
                    }

                </div>
            }



        </div>
    );
}

export default memo(ProductDetails);