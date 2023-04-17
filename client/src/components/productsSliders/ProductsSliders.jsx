import React, { useEffect, useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import './productSliders.css'
import { useQuery } from 'react-query'
import { fetchData } from '../../hooks/hooks'
import FullProductCard from '../fullProductCard/FullProductCard'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../variables.env'
const ProductsSliders = ({ data: propData }) => {
    const { data, isLoading, } = useQuery(['product', propData], () => fetchData(`${BASE_URL}/api/v1/products?category=${propData}&page=1`, 'GET'), {
        enabled: !!propData,
        cacheTime:10
    })
    const [slideNum, setSlideNum] = useState(window.innerWidth / 250)
    useEffect(() => {
        window.addEventListener('resize', (e) => {
            if (e.target.innerWidth < 300) setSlideNum(1)
            setSlideNum(e.target.innerWidth / 250)
        })
    })
    return (
        <div className='products-sliders-by-categories'>
            <h2 style={{
                display:'flex',
                justifyContent:'space-between'
            }}>
                <span>
                   {propData.toUpperCase()} 
                </span>
                <Link state={data?.data} className='link' to={`/products/category/${data?.data[0]?.category}`}>
                <button className='category-show-more'>
                    show more
                </button>
                
                </Link>
            </h2>
            <Swiper navigation={true} spaceBetween={10} slidesPerView={slideNum.toFixed(0)} modules={[Navigation]} className="mySwiper">
                {
                    data?.data?.map((data, i) => <SwiperSlide key={i}>
                        {/* <div className="card"> */}
                            <FullProductCard {...{ data, isLoading }} />
                        {/* </div> */}
                    </SwiperSlide>).slice(0, 10)
                }

            </Swiper>
        </div>
    )
}

export default ProductsSliders
