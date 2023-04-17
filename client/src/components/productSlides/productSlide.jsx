import React from 'react'
import './productSlide.css'
import {Link} from 'react-router-dom'
import { BASE_URL } from '../../variables.env'


const ProductSlide = ({data}) => {
  console.log(data?.photo?.filename)
  return (
    <div className='product-slide' style={{
      backgroundImage:`url(${BASE_URL}/${data?.photo?.filename})`
    }}>
        <div className="product-category">
           {data?.category.toUpperCase()} 
        </div>
        
      <div className="product-info">
        <h1> {data?.title.toUpperCase()} </h1>
        <p>
           {data?.description?.slice(0,30)}...
           </p>
          {/* more info */}
          <Link state={data} className='link' to={`/products/product/${data?.id}`} >
            <button>
              more info
            </button>
            
          </Link>
      </div>
    </div>
  )
}

export default ProductSlide
