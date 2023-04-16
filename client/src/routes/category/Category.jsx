import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import CategoryComponent from '../../components/categoryComponent/CategoryComponent'
import './category.css'
import { useInfiniteQuery, useQuery } from 'react-query'
import { fetchData, useInfiniteFetching } from '../../hooks/hooks'
import ProgressCircule, { ProgressCirculeInline } from '../../components/progressCircule/ProgressCircule'
const Category = () => {
  const { p } = useParams()
  const { state } = useLocation()
  // const { data, isLoading, refetch } = useQuery(['category', p],
  //   () => fetchData(`/api/v1/products/categories/${state[0]?.category}?page=1&limit=2`, 'GET'))

  const { data, isLoading, loadMore, isFetching,refetch,hasNext } = useInfiniteFetching(`/api/v1/products/categories/${state[0]?.category}`);

  useEffect(()=>{
    window.addEventListener('scroll', function() {
      // Get the height of the document, accounting for scroll position
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.pageYOffset;
    
      // Check if we've reached the bottom of the page
      if (documentHeight === scrollPosition) {
        // Call your function to fetch more data here
        if(hasNext) loadMore()
        else return 
      }
    });
  },[])
  return (
    <div>
      <div className='category-list'>
        {
          isLoading ?
            <ProgressCircule />
            :
            <div className="category-list-display">
              {
                data?.map(data =>
                  <CategoryComponent key={data?.id} {...{ data,refetch }} />
                ) || <h2 style={{ margin: 'auto' }}>
                  {
                    data?.error
                  }
                </h2>
              }
            </div>


        }
        {
          isFetching &&
          <ProgressCirculeInline />
        }
      </div>
    </div>
  )
}

export default Category
