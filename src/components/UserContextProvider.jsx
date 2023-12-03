import { createContext, useEffect, useState } from "react"

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
        const id = localStorage.getItem("userId")
        if (id) {
          try {
            const response = await fetch(`http://localhost:5001/users?id=${id}`)
            const users = await response.json()
            const user = users[0]
            setUser(user)
          } catch (error) {
            console.error("Failed to fetch user:", error)
          }
        }
        setLoading(false)
      };
  
      fetchUser()
    }, [])

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("userId", user.id)
    }
  }, [user?.id]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  }

  return (
    <UserContext.Provider value={{ user, onChange: setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  )
}