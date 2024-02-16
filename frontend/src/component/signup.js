// src/Components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  const [eerror, setError] = useState("")
  const [perror, setPerror] = useState('')
  const [nerror, setNerror] = useState("")
  const [cerror, setCerror] = useState('')
  const handleClick = async (e) => {
    e.preventDefault()
    setError('');
    setPerror('');
    setNerror('');
    setCerror('');
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (!name.trim()) {
      setNerror('Name is required');
      return;
    }
    if (!password.trim()) {
      setPerror('Password is required');
      return;
    }
    if (password.length < 6) {
      setPerror('Password must be at least 6 characters');
      return;
    }
    if (!cpassword.trim()) {
      setCerror('Confirm Password is required');
      return;
    }
    if (password !== cpassword) {
      setCerror('Password does not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name:name,
          password: password,
        }),
      });
      if (!response) {
        throw new Error('Failed to sign in');
      }
      const data = await response.json();
      console.log(data);
      if (data.success === 'success') {
        // Handle successful sign-in
        alert('Sign in successful');
        // Redirect the user or perform other actions
      }
      if (data.error === 'Invalid username') {
        setError("Invalied Email")
      }
      if (data.error === 'Invalid password') {
        setPerror("Invalied Password")
      }
    } catch (error) {
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
          <label className=" mr-1 text-xl font-bold">Sign Up</label>

        </div>

        <input
          className="mt-10 text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
          name="email"
        />
        <p className="text-red-600 hover:underline hover:underline-offset-4">{eerror}</p>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          name="name"
        />
        <p className="text-red-600 hover:underline hover:underline-offset-4">{nerror}</p>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Password"
        />
        <p className="text-red-600 hover:underline hover:underline-offset-4">{perror}</p>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          name="cpassword"
          placeholder="Confirm Password"
        />
        <p className="text-red-600 hover:underline hover:underline-offset-4">{cerror}</p>
        <div className="mt-4 flex justify-between font-semibold text-sm">


        </div>
        <div className="text-center md:text-left">
          <button onClick={handleClick}
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit">
            SignUp
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account?{" "}
          <Link to='/' className="text-red-600 hover:underline hover:underline-offset-4">Login</Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;