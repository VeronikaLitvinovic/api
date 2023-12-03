import React from "react"
import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "./../components/UserContextProvider"

export default function About() {
    const { user, loading, logout } = useContext(UserContext)
  return (
    <div>
        <div>
        <h1>About me</h1>
        </div>
        <div>
            <p>Email: {user.email}</p>
            <p>Date sign up: {user.createdAt}</p>
        </div>
        <NavLink
            to="/notes"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
            Go to notes
        </NavLink>
    </div>
  );
}