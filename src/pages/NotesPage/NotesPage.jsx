import React, { useState, useEffect } from "react";
import * as noteService from "../../utils/note-service";
import "./NotesPage.css";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [order, setOrder] = useState("desc");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await noteService.fetchNotes();
        setNotes(notes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    try {
      const newNote = await noteService.addNote(text);
      setNotes([newNote, ...notes]);
      setText("");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditNote = async () => {
    try {
      const updatedNote = await noteService.editNote(editNoteId, editText);
      setNotes(
        notes.map((note) => (note._id === editNoteId ? updatedNote : note))
      );
      setEditNoteId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc");
    setNotes(notes.slice().reverse());
  };

  return (
    <div>
      <h2 className="add-note-heading">Add Note</h2>
      {editNoteId ? (
        <div>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleEditNote}>Save</button>
          <button onClick={() => setEditNoteId(null)}>Cancel</button>
        </div>
      ) : (
        <div className="input-group">
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleAddNote}>Add Note</button>
        </div>
      )}
      <button className="btn-sort" onClick={handleToggleOrder}>
        Sort by:
        {order === "asc" ? " Descending" : " Ascending"}
      </button>
      {notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <ul>
          <h2>Notes List: </h2>
          {notes.map((note) => (
            <li key={note._id}>
              <p>{note.text}</p>
              <p>{new Date(note.createdAt).toLocaleString()}</p>
              <button
                className="btn-delete"
                onClick={() => handleDeleteNote(note._id)}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditNoteId(note._id);
                  setEditText(note.text);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesPage;
