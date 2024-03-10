// src/Components/Login.js
import React, { useEffect, useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "../context/usercontext";

const Login = () => {
  const navigate=useNavigate()
  const {userRole, user,loginUser } = useUser();
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [eerror,setError]=useState("")
  const [perror,setPerror]=useState('')

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (userRole === 'Admin') {
        navigate('/admin',{ state: { username: userRole }})
      } else {
        navigate('/home',{ state: { username: userRole }});
      }
    }
    else{

    }
  }, [navigate]);

  const handleClick=async (e)=>{
    e.preventDefault()
    setError('');
    setPerror('');
    if (!email.trim()) {
      toast.error("Email Required");
      setError('Email is required');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (!password.trim()) {
      setPerror('Password is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (!response) {
        throw new Error('Failed to sign in');
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        // localStorage.setItem('user', data.user);
        if (data.success === 'admin') {
          // setUsername(data.user)
          loginUser(data.user);
          alert('Admin Login Success');
          navigate('/admin',{ state: { username: data.user } })
        }
        if (data.success === 'success') {
          setUsername(data.user)
          loginUser(data.user);
          navigate('/home',{ state: { username: data.user } })
        }
      }
      else{
        if (data.error === 'Invalid username') {
          setError("Invalied Email")
        }
        else {
          setPerror("Invalied Password")
        }
      }
    }catch(error){
      alert(error.message)
    }
  }
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1 font-bold text-lg">Sign In with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <BiLogoFacebook
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <AiOutlineTwitter
              size={20}
              className="flex justify-center items-center w-full"
            />
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="password"
          id="email"
          placeholder="Email Address"
        />
        <p className="text-red-600 hover:underline hover:underline-offset-4">{eerror}</p>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          id="password"
          placeholder="Password"
        />
        <p className="text-red-600 hover:underline hover:underline-offset-4">{perror}</p>
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleClick}>
            Login
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don&apos;t have an account? {""}
          <Link to="/signup" className="text-red-600 hover:underline hover:underline-offset-4"> Register</Link>
        </div>
      </div>
      <ToastContainer />
    </section>
    
  );
};

export default Login;