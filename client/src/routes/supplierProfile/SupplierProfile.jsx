import React, { useEffect } from 'react'
import './supplierProfile.css'
import { useLocation } from 'react-router-dom'
import iphone from '../../assets/iphone.jpg'
import { useInfiniteFetching } from '../../hooks/hooks'
import FullProductCard from '../../components/fullProductCard/FullProductCard'
import { ProgressCirculeInline } from '../../components/progressCircule/ProgressCircule'
import { Avatar } from '@mui/material'
import { BASE_URL } from '../../variables.env'

const SupplierProfile = () => {
    const { state } = useLocation()
    const { data, isLoading, isFetching, loadMore, hasNext } = useInfiniteFetching(`${BASE_URL}/api/v1/supplier/products/product/${state?.id}`)
    useEffect(() => {
        window.addEventListener('scroll', function () {
            // Get the height of the document, accounting for scroll position
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.innerHeight + window.pageYOffset;
            // Check if we've reached the bottom of the page
            if (documentHeight === scrollPosition) {
                // Call your function to fetch more data here
                hasNext && loadMore()
            }
        });
    }, [])
    return (
        <div className="container">
            <div className="supplier-profile-info">{
                state?.photo?.filename ?
                    <img src={`/${state?.photo?.filename}`} alt="" />
                    : <Avatar className='avatar' > {
                        state?.firstname?.charAt(0).toUpperCase()
                    } </Avatar>
            }

                <div className="user-info">
                    <h4> name : {state?.firstname} {state?.lastname} </h4>
                    <h4> username: {state?.username} </h4>
                    <h4> email: {state?.email} </h4>

                </div>
            </div>
            <h2 >Supplier Products</h2>
            <div className="supplier-products-list">

                {
                    isLoading ? <ProgressCirculeInline /> :
                        data?.map((data) => <article key={data?.id}>
                            <FullProductCard data={data} />
                        </article>)
                }

            </div>
            {
                isFetching && <ProgressCirculeInline />
            }
        </div>
    )
}

export default SupplierProfile
