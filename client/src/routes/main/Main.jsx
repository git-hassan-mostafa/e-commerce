import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import SwiperSlides from '../../components/productSwiper/ProductsSwiper'
import './main.css'
import { fetchData } from '../../hooks/hooks'
import ProductsSliders from '../../components/productsSliders/ProductsSliders'
import { CircularProgress } from '@mui/material'
const Main = () => {

  const { data, isLoading, error, refetch } = useQuery('product', () => fetchData('/api/v1/products', 'GET'))
  const { data: categoryData, isLoading: loading, refetch: refetching } =
    useQuery('category', () => fetchData('/api/v1/products/categories/category', 'GET'))
  return (
    <main className='container'>
      {
        isLoading || loading ? <div className="progress-circule">
          <CircularProgress className='progress-circule-icon' />
        </div> :
          <>
            <SwiperSlides {...{ data, isLoading, error, refetch }} />
            {
              loading ? 'loading' :
                <div className="list-by-categories">
                  {
                    categoryData?.data?.map((data) => <ProductsSliders key={data} {...{ data }} />).sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 5)

                  }
                </div>
            }
          </>
      }

    </main>
  )
}

export default Main
