import React, { useContext, useState } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { NavLink, useNavigate } from "react-router-dom" 

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

    const userContext = useContext(UserContext)
    const navigate = useNavigate()

  function handleLogin() {
    const query = new URLSearchParams({
        email,
        password
    }).toString()
    fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
            if (user) {
                userContext.onChange(user)
                setError('')
                navigate('/about')
            } else {
                setError('Invalid user')
            }
        })
  }

  function handleSignUp() {
    navigate('/signup') 
  }

  return (
    <div className='prose flex flex-col gap-5'>
      <h1>Login</h1>
      <input 
        placeholder='email' 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        placeholder='password' 
        type='password' 
        value={password}  
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Login</button>
      <button onClick={handleSignUp} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Sign Up</button>

      {error && <div style={{color: 'red'}}>{error}</div>}
    </div>
  )
}