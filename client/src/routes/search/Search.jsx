import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import SearchComponent from '../../components/SearchComponent/SearchComponent'
import { fetchData, useInfiniteFetching } from '../../hooks/hooks'
import './search.css'
import ProgressCircule, { ProgressCirculeInline } from '../../components/progressCircule/ProgressCircule'
const Search = () => {
  const { p } = useParams()

  const { data, isLoading, isFetching, loadMore, refetch, hasNext } = useInfiniteFetching(`/api/v1/products/search/searchvalue`, `maxPrice=1200&minPrice=60&minRating=3&demandedQuantity=60&search=${p}`)

  useEffect(() => {
    refetch()
  }, [p])

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
      <div className='search-list'>
        {
          isLoading ?

            <ProgressCircule/>
            :
            <div className="search-list-display">
              {
                data?.map(data =>
                  <SearchComponent key={data?.id} {...{ data, refetch }} />
                ) || <h2 style={{ margin: 'auto' }}>
                  {
                    data?.error
                  }
                </h2>
              }
            </div>


        }
      </div>
      {
        isFetching && <ProgressCirculeInline />
      }
    </div>
  )
}

export default Search
