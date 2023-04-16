import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { fetchUser } from '../../redux/userSlice';
import './auth.css';
import { useTheme } from '@emotion/react';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Alert, Snackbar } from '@mui/material';


const Login = () => {
    const dispatchRedux = useDispatch()
    const navigate = useNavigate()

    const [data,setData]=useState([])
    // fetching function
    const fetchLogin = async (body) => {
        try {
            const response = await fetch('/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                console.error('not ok')
            }
            const data = await response.json()
            setData(data)
            console.log(data)
            if (data?.message) {
                await dispatchRedux(fetchUser())
                console.log(status)
                navigate('/home')
            }
            return data
        }
        catch (error) {
            console.log(error)
        }

    };

    // redux user
    const { user, status } = useSelector(state => state.user)

    // //email ref
    // var emailRef = useRef()
    // const userMail = emailRef?.current?.value ;

    // //password ref
    // var passwordRef = useRef()
    // const password=passwordRef?.current?.value

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    //initial state for reducer
    const initialState = {
        userMail: '',
        password: ''
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'userMail': return {
                ...state, userMail: action.payload
            }
            case 'password': return {
                ...state, password: action.payload
            }
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState)

    //react query hook
    // const { data, isLoading, error, refetch,isFetching } =
    //     useQuery([['login',state], { email, password }],
    //         () => fetchLogin({ email, password }), {
    //         enabled:false,
    //     })



    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    //handling form sumbit
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await fetchLogin({ userMail: state.userMail, password: state.password })
        setIsLoading(false)
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000);
    }

    const theme = useTheme()
    return (
        <>
            {user?.data && <Navigate to={'/home'} />}
            <form onSubmit={handleSubmit} className='auth'>
                <h2>login</h2>
                <label htmlFor="">email or username</label>
                <input onChange={(e) => dispatch({ type: 'userMail', payload: e.target.value })} placeholder='example@gmail.com' type="text" />
                <label htmlFor="">password</label>
                <input onChange={(e) => dispatch({ type: 'password', payload: e.target.value })} placeholder='password' type="password" />
                <span style={{ color: 'red' }}></span>
                <LoadingButton
                    loading={status === 'loading' || isLoading}
                    variant='contained' sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.secondary.main,
                        padding: '10px'
                    }} type='submit'>submit</LoadingButton>
            </form>
            <div style={{
                marginTop: '10px'
            }}>
                {
                    <Snackbar anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }} open={open} autoHideDuration={4000} >
                        <Alert severity={data?.message ? 'success' : 'error'} sx={{ width: '100%' }}>
                            {
                                data?.message || data?.error
                            }
                        </Alert>
                    </Snackbar>
                }
            </div>

            <p>don't have an account ? <Link style={{
                color: 'gray'
            }} to={'/register/signup'} >signup</Link> </p>
        </>

    )
}

export default Login
