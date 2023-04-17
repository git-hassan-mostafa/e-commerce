import React, { useEffect } from 'react'
import { useInfiniteFetching } from '../../hooks/hooks';
import ProductSupplierComponent from '../ProductSupplierComponent/ProductSupplierComponent';
import './supplierProducts.css'
import ProgressCircule, { ProgressCirculeInline } from '../progressCircule/ProgressCircule';
import { BASE_URL } from '../../variables.env';
const SupplierProducts = () => {
  const { data, isLoading, isFetching, refetch, loadMore, hasNext } = useInfiniteFetching(`${BASE_URL}/api/v1/supplier/products`)

  useEffect(() => {
    window.addEventListener('scroll', function () {
      // Get the height of the document, accounting for scroll position
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.pageYOffset;

      // Check if we've reached the bottom of the page
      if (documentHeight === scrollPosition) {
        // Call your function to fetch more data here
        if (hasNext) {
          loadMore()
        }
        else return
      }
    });
  }, [])
  return (
    <div>
      <div className='supplier-product'>
        {
          isLoading?

            <ProgressCirculeInline />
            :
            <div className="supplier-product-display">
              {
                data?.map(data => <ProductSupplierComponent key={data?.id} {...{ data,refetch,isFetching }} />
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

export default SupplierProducts
