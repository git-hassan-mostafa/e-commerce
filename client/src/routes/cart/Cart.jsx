import React, { useEffect } from 'react'
import CartComponent from '../../components/CartComponent/CartComponent'
import { useInfiniteFetching } from '../../hooks/hooks'
import './cart.css'
import ProgressCircule, { ProgressCirculeInline } from '../../components/progressCircule/ProgressCircule'
import { BASE_URL } from '../../variables.env'

const Cart = () => {

  const { data, isLoading, isFetching, refetch, loadMore, hasNext } = useInfiniteFetching(`${BASE_URL}/api/v1/product/cart`)

  useEffect(() => {
    window.addEventListener('scroll', function () {
      // Get the height of the document, accounting for scroll position
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.pageYOffset;

      // Check if we've reached the bottom of the page
      if (documentHeight === scrollPosition) {
        // Call your function to fetch more data here
        if (hasNext) loadMore()
        else return
      }
    });
  }, [])
  return (
    <div>
      <div className='cart'>
        {
          isLoading ?

            <ProgressCircule />
            :
            <div className="cart-display">
              {
                data?.map(data => <CartComponent key={data?.id} {...{ data, refetch }} />
                ) ||
                <h2 style={{ margin: 'auto' }}>
                  {
                    data?.error
                  }
                </h2>
              }
            </div>
        }

      </div>

      {
        isFetching &&
        <ProgressCirculeInline />
      }
    </div>
  )
}

export default Cart
