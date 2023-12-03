import React, { useState, useEffect } from "react" 
import { NavLink, useNavigate } from "react-router-dom" 

export default function Notes() {
  const [userNotes, setUserNotes] = useState([]) 
  const navigate = useNavigate() 

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [] 

    const sortedNotes = notes.sort((a, b) => b.createdAt - a.createdAt) 

    setUserNotes(sortedNotes) 
  }, []) 

  const handleDeleteNote = (noteId) => {
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [] 

    const updatedNotes = existingNotes.filter((note) => note.id !== noteId) 

    localStorage.setItem("notes", JSON.stringify(updatedNotes)) 
    setUserNotes(updatedNotes) 
  } 

  const handleEditNote = () => {
    navigate("/editNote") 
  } 

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Мои заметки</h1>
      <NavLink
        to="/createNote"
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow mr-2"
      >
        Add new note
      </NavLink>
      {userNotes.map((note) => (
        <div key={note.id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-lg font-medium mb-1">{note.title}</h2>
          <p className="text-sm text-gray-600 mb-2">
  {note.createdDate && new Date(note.createdDate).toLocaleDateString()}
</p>
          <div className="flex justify-between items-center">
            <button
              onClick={handleEditNote}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              ✍️
            </button>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  ) 
}