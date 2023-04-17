import React, { memo } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/autoplay';
// import "./styles.css";
import './productsSwiper.css';

// import required modules
import { Navigation } from "swiper";
import ProductSlide from "../productSlides/productSlide";

export default memo( function  SwiperSlides({ data, isLoading, error, refetch }) {

    return (
        <div className="swiperContainer">
            <Swiper navigation={true} slidesPerView={1} modules={[Navigation]} className="mySwiper">
                {
                    data?.data?.map(data => <SwiperSlide key={data._id}>
                        {isLoading ? 'loading' : <ProductSlide data={data} />
                        }
                    </SwiperSlide>).slice(0, 10).sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 5)
                }
            </Swiper>
        </div>
    );
})
