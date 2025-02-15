import React, { } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProfileInfo } from './ProfileInfo';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
    
    const navigate =useNavigate();

    const onLogout = () => {
        
    }
    
  return (
    <div className='flex flex-row justify-between items-center px-10'>
        {/* logo */}
        <div>Logo</div>
        {/* profile */}
        <div>
            {
            
           
                (
                <ProfileInfo onLogout={onLogout}/>
                )
            }
        </div>
    </div>
  )
}