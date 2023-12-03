import React, { useState, useEffect } from "react" 
import { NavLink, useNavigate, useParams } from "react-router-dom" 

export default function ViewNote() {
  const [noteTitle, setNoteTitle] = useState("") 
  const [noteContent, setNoteContent] = useState("") 
  const navigate = useNavigate() 
  const { noteId } = useParams() 

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [] 
    const note = notes.find((note) => note.id === noteId) 

    if (note) {
      setNoteTitle(note.title) 
      setNoteContent(note.content) 
    }
  }, [noteId]) 

  const handleEditNote = () => {
    navigate(`/editNote`) 
  } 

  const handleDeleteNote = () => {
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [] 
    const updatedNotes = existingNotes.filter((note) => note.id !== noteId) 

    localStorage.setItem("notes", JSON.stringify(updatedNotes)) 

    navigate("/notes") 
  } 

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <NavLink
        to="/notes"
        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow mb-4"
      >
        Back
      </NavLink>
      <h1 className="text-2xl font-bold mb-4">{noteTitle}</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleEditNote}
          className="bg-blue-200 hover:bg-blue-400 text-blue-800 font-semibold py-2 px-4 rounded shadow mr-2"
        >
          ✍️ Редактировать
        </button>
        <button
          onClick={handleDeleteNote}
          className="bg-red-200 hover:bg-red-400 text-red-800 font-semibold py-2 px-4 rounded shadow"
        >
          🗑️ Удалить
        </button>
      </div>

      <p className="text-gray-700">{noteContent}</p>
    </div>
  ) 
}