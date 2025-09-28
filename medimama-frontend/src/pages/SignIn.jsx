import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import medibg from "../assets/medibg.png";
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/auth';
import toast from "react-hot-toast";

const signIn = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { message } = await login(email, password);
      toast.success(message || 'Logged in');
      navigate('/');
      console.log('Logged successfully');
    } catch (error) {
      console.error('Login failed', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  }


  return (
    <motion.div 
    initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}

    className='max-w-xl items-center justify-center mx-auto p-6 mt-6 bg-white shadow-md rounded-lg '
      
      >

      

        <h1 className='text-2xl font-bold text-green-700 mb-6 flex items-center flex-col'>
Sign In
        </h1>

        <form 
       onSubmit={handleLogin} 
       className='flex flex-col space-y-4'>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email 
          </label>
        <input type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email address'
        className='w-full p-3 border rounded'/>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password 
          </label>
        <input type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter your Password'
        className='w-full p-3 border rounded'/>
        </div>


        
    {error && <p className='text-shadow-red-500'>{error}</p>}
        <button 
        onSubmit={handleLogin}
        type='submit'
        disabled={isLoading}
        className='bg-green-700 text-white py-3 rounded font-medium
        hover:bg-green-900 transition hover:opacity-90 cursor-pointer'>
                Sign In
        </button>
        </form>

        <div className='mt-10 text-gray-700 text-sm flex justify-between w-full px-4 items-center '>
            <p>New to Medimama? <span onClick={() => navigate("/signup")}
                className='text-green-700 font-medium cursor-pointer ml-2 hover:underline'>
                    Sign Up Now</span></p>

        </div>
      
    </motion.div>
  )
}

export default signIn
