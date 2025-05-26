import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { backendUrl } from '../App';
import {  toast } from 'react-toastify';
const Login = (	{setToken}	) => {


	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("");
	const onSubmitHandler= async (e)=>{
		try{
			e.preventDefault();
			const response=await axios.post(backendUrl+"/api/user/admin",{email,password});
			if(response.data.success)
			{
				setToken(response.data.token);
			}
			else
			{
               toast.error(response.data.message);
			}
		}
		catch(err){
			console.log('error in admin login page');
			console.log(err);
		}
	}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Panel</h1>
        
        <form className="space-y-5" onSubmit={onSubmitHandler}>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} vlaue={email}
              type="email"
              placeholder="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} vlaue={password}
              type="password"
              placeholder="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
