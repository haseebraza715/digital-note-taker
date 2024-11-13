import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // State to hold the selected note for editing

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/notes");
      console.log("Fetched notes:", response.data); // Check if data is fetched correctly
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async (note) => {
    try {
      await axios.post("http://127.0.0.1:5000/notes", note);
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const updateNote = async (id, updatedContent) => {
    try {
      await axios.put(`http://127.0.0.1:5000/notes/${id}`, updatedContent);
      fetchNotes();
      setSelectedNote(null); // Clear the selected note after updating
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Function to set the note for editing
  const selectNote = (note) => {
    setSelectedNote(note);
  };

  useEffect(() => {
    fetchNotes();
  }, []); // The empty dependency array ensures this runs only once on mount

  return (
    <div className="App">
      <h1>Digital Note-Taker</h1>
      <NoteForm
        addNote={addNote}
        updateNote={updateNote}
        selectedNote={selectedNote}
      />
      <NoteList notes={notes} deleteNote={deleteNote} selectNote={selectNote} />
    </div>
  );
}

export default App;
