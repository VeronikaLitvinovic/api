import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

export default function CreateNote() {
  const [noteTitle, setNoteTitle] = useState("")
  const [noteContent, setNoteContent] = useState("")
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const handleCreateNote = () => {
    setErrors([]);

    if (!noteTitle.trim()) {
      setErrors(["Note title cannot be empty"])
      return;
    }

    const note = {
      title: noteTitle,
      content: noteContent
    };

    const existingNotes = JSON.parse(localStorage.getItem("notes")) || []
    const updatedNotes = [...existingNotes, note]

    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    navigate("/viewNote");
  };


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <NavLink
        to="/notes"
        className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded shadow mb-4"
      >
        Back
      </NavLink>
      <h1 className="text-2xl font-bold mb-4">Create new note</h1>

      <input
        type="text"
        placeholder="Name"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      <textarea
        placeholder="Note text..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />

      {errors.length > 0 && (
        <div className="text-red-500 mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <button
        onClick={handleCreateNote}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow mr-2"
      >
        Add
      </button>
    </div>
  );
}