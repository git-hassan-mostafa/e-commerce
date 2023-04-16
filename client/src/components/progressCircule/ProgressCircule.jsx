import { CircularProgress } from '@mui/material'
import React from 'react'

const ProgressCircule = () => {
    return (
        <div className='progress-circule'>
            <CircularProgress className='progress-circule-icon' />
        </div>
    )
}

export const ProgressCirculeInline = () => {
    return (
            <CircularProgress className='progress-circule-icon' style={{
                color:'#17202A',
                display:'block',
                margin:'10px auto'
            }} />
    )
}

export default ProgressCircule
