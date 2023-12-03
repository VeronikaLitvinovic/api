import React, { useState, useEffect } from "react" 
import { NavLink, useNavigate, useParams } from "react-router-dom" 

export default function EditNote() {
  const [title, setTitle] = useState("") 
  const [content, setContent] = useState("") 
  const navigate = useNavigate() 
  const { noteId } = useParams() 

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes")) || [] 
    const note = notes.find((note) => note.id === noteId) 

    if (note) {
      setTitle(note.title) 
      setContent(note.content) 
    }
  }, [noteId]) 

  const handleTitleChange = (e) => {
    setTitle(e.target.value) 
  } 

  const handleContentChange = (e) => {
    setContent(e.target.value) 
  } 

  const handleSaveNote = () => {
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [] 

    const updatedNotes = existingNotes.map((note) => {
      if (note.id === noteId) {
        return {
          ...note,
          title: title,
          content: content,
        } 
      }
      return note 
    }) 

    localStorage.setItem("notes", JSON.stringify(updatedNotes)) 

    navigate("/notes") 
  } 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>

      <div className="mb-4">
        <label className="font-semibold">Note Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="font-semibold">Note Content:</label>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSaveNote}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow mr-2"
        >
          Save
        </button>

        <NavLink
          to="/notes"
          className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow"
        >
          Back
        </NavLink>
      </div>
    </div>
  ) 
}