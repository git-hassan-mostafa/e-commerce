import React, { useReducer, useState } from 'react'
import './addProduct.css'
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar } from '@mui/material'
import photo from '../../assets/photo.png'
import { useTheme } from '@emotion/react'
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/autoplay'

// import required modules
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react'

import { BiImageAdd } from 'react-icons/bi'
import { useQuery } from 'react-query'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'

const AddProduct = () => {
    const theme = useTheme()


    const [photo, setPhoto] = useState(null)
    const [images, setImages] = useState([])


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(null)
    const [discountPrice, setDiscountPrice] = useState(null)
    const [category, setCategory] = useState('phones')
    const [quantity, setQuantity] = useState(null)


    const [photoPreview, setPhotoPreview] = useState(null)
    const [imagesPreview, setImagesPreview] = useState([])
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [categories, setCategories] = useState([
        'phones',
        'electronics',
        'clothing',
        'accessories',
        'toys',
        'sports',
        'home',
        'beauty',
        'food',
        'shoes',
        'watches',
        'tools',
        'vehicules',
        'technology'
    ])

    const [categoryValue, setCategoryValue] = useState(0)

    const fetchAddProduct = async (body) => {
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            const response = await fetch('/api/v1/supplier/products', {
                method: 'POST',
                credentials: 'include',
                body,
                // headers
            });
            if (!response.ok) {
                console.error('not ok')
            }
            const responseData = await response.json()
            setData(responseData)
            console.log(responseData)
            return data
        }
        catch (error) {
            console.log(error)
        }

    };

    function handlePhotoChange(event) {
        setPhoto(event.target.files[0]);
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setPhotoPreview(url);
    }

    //handle images changes
    function handleImagesChange(event) {
        const files = event.target.files;
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
        setImagesPreview(urls)
        const filesArray = Array.from(files)
        setImages(filesArray)
    }

    const handleSelectChange = (e) => {
        setCategoryValue(e.target.value)
        setCategory(categories[e.target.value])

    }

    const handleSubmit = async (event) => {
        const formData = new FormData();
        event.preventDefault();
        console.log(title, description, price, discountPrice, category, quantity, photo, images)
        if (!(title && description && price && discountPrice && category && quantity && photo) || images.length < 1) {
            setErrorMessage('all fields are required')
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 3000);
            return
        }
        else setErrorMessage(null)
        formData.append('photo', photo);
        images.forEach(image => {
            formData.append(`images`, image);
        });
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('discountPrice', discountPrice);
        formData.append('category', category)
        formData.append('quantity', quantity)


        setIsFetching(true)
        await fetchAddProduct(formData)
        console.log(data)
        setIsFetching(false)
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000);
    }

    return (
        <>
            <div className="swiperContainer">
                <Swiper navigation={true} slidesPerView={1} modules={[Navigation]} className="mySwiper">
                    {
                        imagesPreview.map((data, i) => <SwiperSlide key={data}>
                            <img src={data} alt="" className="images-preview" />
                        </SwiperSlide>)
                    }
                    {
                        <SwiperSlide>

                            <BiImageAdd style={{
                                fontSize: '70px',
                                color: theme.palette.primary.main
                            }} />

                            <input multiple={true} className='first-input-file' type="file" accept='.jpg,.jpeg,.png,.jfif,.avif,.webp' name="photo" onChange={handleImagesChange} />

                        </SwiperSlide>}
                </Swiper>

            </div>
            <form className='add-product container' onSubmit={handleSubmit}>
                <div className='img'>
                    <img src={photoPreview ? photoPreview : photo} alt="" />
                </div>
                <label htmlFor="">upload a photo for your product</label>
                <input type="file" accept='.jpg,.jpeg,.png,.jfif,.avif,.webp' name="photo" onChange={handlePhotoChange} />
                <label htmlFor="">product title</label>
                <input onChange={(e) => setTitle(e.target.value)} placeholder='product title ' type="text" />
                <label htmlFor="">description</label>
                <input onChange={(e) => setDescription(e.target.value)} placeholder='description...' type="text" />
                <label htmlFor="">price</label>
                <input onChange={(e) => setPrice(e.target.value)} placeholder='$' type="number" />
                <label htmlFor="">discount price</label>
                <input onChange={(e) => setDiscountPrice(e.target.value)} placeholder='$' type="number" />
                <label htmlFor="">quantity</label>
                <input onChange={(e) => setQuantity(e.target.value)} placeholder='$' type="number" />
                <label htmlFor="">category</label>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryValue}
                            label="category"
                            onChange={handleSelectChange}
                        >
                            {
                                categories.map((c, i) => <MenuItem key={i} value={i}>{c}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Box>
                <LoadingButton
                    loading={isFetching}
                    variant='contained' sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.secondary.main,
                        padding: '10px'
                    }} type='submit'>submit</LoadingButton>
            </form>
            <div style={{
                marginTop: '10px'
            }}>
                {
                    <Snackbar anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }} open={open} autoHideDuration={4000} >
                        <Alert severity={data?.message ? 'success' : 'error'} sx={{ width: '100%' }}>
                            { errorMessage? errorMessage:
                                data?.message ? data?.message : data?.error ?
                                    typeof data?.error === 'object' ?
                                        'all fields are required' :
                                        data?.error :
                                    data?.error
                            }
                        </Alert>
                    </Snackbar>
                }
            </div>
        </>
    )
}

export default AddProduct
