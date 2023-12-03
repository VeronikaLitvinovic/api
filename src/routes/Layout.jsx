import { useContext } from "react" 
import { NavLink, Outlet, useLocation } from "react-router-dom"
import { UserContext } from "../components/UserContextProvider"

export default function Home() {
  const { user, loading, logout } = useContext(UserContext) 
  const location = useLocation() 

  const handleLogout = () => {
    logout() 
  } 

  return (
    <div>
      <header className="flex gap-10 items-center bg-white py-4 px-8">
        <div>
          <h1 className="text-xl font-semibold">Hello, {user.email}</h1>
        </div>
        <div className="flex gap-5 ml-auto">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            className={({ isActive }) => (isActive ? "link-active" : "link")}
          >
            Notes
          </NavLink>
          <button
            onClick={handleLogout}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Outlet />
      </main>

      <footer className="flex items-center justify-between bg-white py-4 px-8 text-sm">
        <p>Created by: Litvinovich Veronika</p>
        <p>BSU: 2023</p>
      </footer>
    </div>
  ) 
}
