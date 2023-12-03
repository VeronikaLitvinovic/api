import React, { useContext, useState } from 'react' 
import { UserContext } from '../components/UserContextProvider' 
import { NavLink, useNavigate } from "react-router-dom" 
import { User } from './../utils/validation' 
import { z } from 'zod' 

export default function SignUp() {
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [repeatPassword, setRepeatPassword] = useState('') 
  const [error, setError] = useState('') 

  const userContext = useContext(UserContext) 
  const navigate = useNavigate() 

  function handleSignUp() {
    try {
      const user = User.parse({
        email,
        password,
        date: Date.now()
      }) 
      console.log(user) 
      setError(null) 
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.format()) 
      }
    }
  
    const query = new URLSearchParams({
      email,
      password
    }).toString() 
  
    fetch(`http://localhost:5001/users`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
      .then((r) => r.json())
      .then((users) => users[0])
      .then((user) => {
        if (user) {
          setError('User with this email already exists') 
        } else {
          const userData = {
            email,
            password
          } 
          localStorage.setItem('userData', JSON.stringify(userData)) 
  
          userContext.onChange(user) 
          navigate('/about') 
        }
      }) 
  
  }

  return (
    <div className='prose flex flex-col gap-5'>
      <h1>Sign Up</h1>
      <input 
        placeholder='Email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      {error?.email && <div className='text-red-400'>{error?.email?._error}</div>}
      <input 
        placeholder='Password' 
        type='password' 
        value={password}  
        onChange={(e) => setPassword(e.target.value)}
      />
      {error?.password && <div className='text-red-400'>{error?.password?._error}</div>}
      <input
        placeholder='Repeat Password'
        type='password'
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button onClick={handleSignUp} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Sign up</button>

      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  )
}
