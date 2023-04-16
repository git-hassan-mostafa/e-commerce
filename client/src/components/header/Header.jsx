import React, { useState } from 'react';
import './Header.css';
import profile from '../../assets/photo.png';
import { Link, useNavigate } from 'react-router-dom';
import { GoSearch } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { RxHamburgerMenu } from 'react-icons/rx';
import SideBar from '../SideBar/SideBar';
import { togglingSideBar } from '../../redux/stateSlice';
import { memo } from 'react';
import { Avatar } from '@mui/material';
import { useTheme } from '@emotion/react';
import icon from '../../assets/icon.ico'

const Header = () => {
  const { user, status } = useSelector(state => state.user)
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (inputValue.length < 1) return
    else navigate(`products/search/${inputValue}`)
  }
  const { toggleSideBar } = useSelector(state => state.state)
  const dispatch = useDispatch()
  const theme=useTheme()
  return (
    <>
      {
        toggleSideBar && <div className="--side-bar">
          <div onClick={() => dispatch(togglingSideBar())} className="black-block"></div>
          <SideBar />
        </div>
      }
      <header>
        <div className="container">
          <div className="header">
            <Link className="header_logo" to={'/home'}>
              <img src={icon || logo} alt="" />
            </Link>
            <form onSubmit={handleSubmit} className="header_search">
              <input onChange={(e) => setInputValue(e?.target?.value)} type="text" placeholder="Search" />
              <button type='submit'>
                <GoSearch />
              </button>



            </form>

            {status == 'loading' ? '' :
              user?.data ?
                <div className='registerDiv'>
                  <Link to={'/profile'} className='link'>
                    {
                      user?.data?.photo?.filename ?
                        <img className='profile' src={`/${user?.data?.photo?.filename}`} alt="" />
                        : <Avatar sx={{
                          bgcolor:theme.palette.primary.main
                        }} className='profile'> {user?.data?.firstname?.charAt(0).toUpperCase()} </Avatar>
                    }
                  </Link>

                  <RxHamburgerMenu onClick={() => dispatch(togglingSideBar())} style={{
                    fontSize: '35px',
                    cursor: 'pointer'
                  }} />
                </div>
                :
                <div className='registerDiv'>
                  <Link to={'/register/signup'} className='signup'>signup</Link>
                  <Link to={'/register/login'} className='login'>login</Link>
                </div>

            }
          </div>

        </div>

      </header>
    </>

  );
};

export default memo(Header);