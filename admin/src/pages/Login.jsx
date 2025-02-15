import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import axios from 'axios';
import PasswordInput from '../components/PasswordInput';
import { AppContext } from '../context-api/AppContext';

export default function Login() {

  const {setToken,backendUrl} = useContext(AppContext);

  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.post(backendUrl + "/api/admin/login",{email,password})

        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          navigate("/");
        }else{
          toast.error(data.message)
        }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  )
}