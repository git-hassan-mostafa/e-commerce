import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/photo.png';
import { useQuery } from 'react-query';
import { fetchUser } from '../../redux/userSlice';
import { Alert, Snackbar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useTheme } from '@emotion/react';
const Signup = () => {
    const [photo, setPhoto] = useState('')
    const [open, setOpen] = useState(false)

    //photo preview
    const [photoPreview, setPhotoPreview] = useState(null)

    const dispatching = useDispatch();
    const navigate = useNavigate()

    //signup function of the usequery
    const fetchSignup = async (body) => {
        try {
            const response = await fetch('/api/v1/auth/signup', {
                method: 'POST',
                credentials: 'include',
                body
            });
            if (!response.ok) {
                console.error('not ok')
            }
            const data = await response.json()
            console.log(data)
            if (data?.message) {
                await dispatching(fetchUser())
                console.log(status)
                navigate('/home')
            }
            return data
        }
        catch (error) {
            console.log(error)
        }

    };

    const { user, status } = useSelector(state => state.user)

    //initial state for reducer
    const initialState = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        isSupplier: false
    }


    const formData = new FormData();



    const { data, isLoading, error, refetch, isFetching } = useQuery(['signup', formData], () => fetchSignup(formData),{
        enabled:false
    })
    function handlePhotoChange(event) {
        setPhoto(event.target.files[0]);
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setPhotoPreview(url);
    }

    // use reducer
    const reducer = (state, action) => {
        switch (action.type) {
            case 'FNAME': return {
                ...state, firstname: action.payload
            }
            case 'LNAME': return {
                ...state, lastname: action.payload
            }
            case 'EMAIL': return {
                ...state, email: action.payload
            }
            case 'USERNAME': return {
                ...state, username: action.payload
            }
            case 'PASSWORD': return {
                ...state, password: action.payload
            }
            case 'ISSUPPLIER': return {
                ...state, isSupplier: action.payload
            }
        }
    }


    const [state, dispatch] = useReducer(reducer, initialState)

    //handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        formData.append('photo', photo);
        formData.append('firstname', state.firstname);
        formData.append('lastname', state.lastname);
        formData.append('username', state.username);
        formData.append('email', state.email);
        formData.append('password', state.password);
        formData.append('isSupplier', state.isSupplier);
        await refetch()
        document.querySelectorAll('input').forEach(input => {
            input.value = ''
        })
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 3000);
    }

    const theme = useTheme()
    return (
        <>
            <form className='auth' onSubmit={handleSubmit}>
                <h2>sign up</h2>
                <div className='img'>
                    <img src={photoPreview ? photoPreview : logo} alt="" />
                </div>

                <label htmlFor="">upload photo</label>
                <input type="file" accept='.jpg,.jpeg,.png,.jfif,.avif' name="photo" onChange={handlePhotoChange} />
                <label htmlFor="">first name</label>
                <input onChange={(e) => dispatch({ type: 'FNAME', payload: e.target.value })} placeholder='first name' type="text" />
                <label htmlFor="">last name</label>
                <input onChange={(e) => dispatch({ type: 'LNAME', payload: e.target.value })} placeholder='last name' type="text" />
                <label htmlFor="">email</label>
                <input onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })} placeholder='example@gmail.com' type="email" />
                <label htmlFor="">user name</label>
                <input onChange={(e) => dispatch({ type: 'USERNAME', payload: e.target.value })} placeholder='@username' type="text" />
                <label htmlFor="">password</label>
                <input onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })} placeholder='password' type="password" />
                <div>
                    <input onChange={(e) => dispatch({ type: 'ISSUPPLIER', payload: e.target.checked })} type="checkbox" />
                    <span>sign up as a supplier</span>

                </div>
                <LoadingButton
                    loading={status === 'loading' || isFetching}
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
                                    ?
                                    typeof data?.error === 'object' ? 'username or email already exists' : data?.error
                                    :
                                    data?.error
                            }
                        </Alert>
                    </Snackbar>
                }
            </div>
            <p>already have an account ? <Link style={{
                color: 'gray'
            }} to={'/register/login'} >login</Link></p>
        </>
    )
}

export default Signup




