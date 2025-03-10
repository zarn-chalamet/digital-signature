import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProfileInfo } from '../ProfileInfo';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from './AppContext';

export default function Navbar() {

  const { token, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const onLogout = () => {
    token && setToken("");
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className='flex flex-row items-center justify-between px-10'>
      {/* logo */}
      <div>Logo</div>
      {/* profile */}
      <div>
        {


          (
            <ProfileInfo onLogout={onLogout} />
          )
        }
      </div>
    </div>
  )
}