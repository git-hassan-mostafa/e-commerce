import { Avatar, Box, Button, CircularProgress, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchData, useInfiniteFetching } from '../../hooks/hooks'
import './orders.css'
import OrderedListComponent from '../../components/OrderedListComponent/OrderedListComponent'
import ProgressCircule, { ProgressCirculeInline } from '../../components/progressCircule/ProgressCircule'
import { BASE_URL } from '../../variables.env'

const Orders = () => {
  const { data, isLoading, isFetching, refetch, loadMore, hasNext } = useInfiniteFetching(`${BASE_URL}/api/v1/product/order`)

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
    <div className='orders-list'>
      {
        isLoading ?

          <ProgressCircule />
          :
          <div className="orders-list-display">
            {
              data?.map(data => <OrderedListComponent key={data?.id} {...{ data, refetch }} />
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
  )
}

export default Orders
