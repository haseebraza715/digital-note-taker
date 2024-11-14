import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import axios from "axios";
import "./App.css";
import { FaUser } from "react-icons/fa"; // import react-icons for a user icon

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [error, setError] = useState("");
  const [isFlaskServerAvailable, setIsFlaskServerAvailable] = useState(false);

  useEffect(() => {
    document.body.classList.add(isDarkTheme ? "dark-theme" : "light-theme");
    document.body.classList.remove(isDarkTheme ? "light-theme" : "dark-theme");
  }, [isDarkTheme]);

  // Check if Flask server is available
  const checkFlaskServer = async () => {
    try {
      await axios.get("http://127.0.0.1:5000/notes");
      setIsFlaskServerAvailable(true);
    } catch (error) {
      setIsFlaskServerAvailable(false);
    }
  };

  useEffect(() => {
    checkFlaskServer();
    fetchNotes();
  }, []);

  // Fetch notes from Flask or local storage
  const fetchNotes = async () => {
    if (isFlaskServerAvailable) {
      try {
        const response = await axios.get("http://127.0.0.1:5000/notes");
        setNotes(response.data);
      } catch (error) {
        setError("Error fetching notes:", error);
      }
    } else {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      setNotes(savedNotes);
    }
  };

  // Add note to Flask or local storage
  const addNote = async (note) => {
    if (notes.some((n) => n.title === note.title)) {
      alert("A note with this title already exists!");
      return;
    }

    if (isFlaskServerAvailable) {
      try {
        await axios.post("http://127.0.0.1:5000/notes", note);
        fetchNotes();
      } catch (error) {
        setError("Error adding note:", error);
      }
    } else {
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  // Update note in Flask or local storage
  const updateNote = async (id, updatedContent) => {
    if (isFlaskServerAvailable) {
      try {
        await axios.put(`http://127.0.0.1:5000/notes/${id}`, updatedContent);
        fetchNotes();
        setSelectedNote(null);
      } catch (error) {
        setError("Error updating note:", error);
      }
    } else {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, ...updatedContent } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setSelectedNote(null);
    }
  };

  // Delete note in Flask or local storage
  const deleteNote = async (id) => {
    if (isFlaskServerAvailable) {
      try {
        await axios.delete(`http://127.0.0.1:5000/notes/${id}`);
        fetchNotes();
      } catch (error) {
        setError("Error deleting note:", error);
      }
    } else {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const selectNote = (note) => {
    setSelectedNote(note);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={`app-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <div className="header">
        <div className="title-container">
          <h1 style={{ color: isDarkTheme ? "#72c7ff" : "#333" }}>
            Digital Note-Taker
          </h1>
        </div>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </button>
          <a
            href="/how-to-use.html"
            target="_blank"
            rel="noopener noreferrer"
            className="help-link"
          >
            How to Use
          </a>
          <div className="author-info">
            <FaUser className="header-icon" />
            <span>
              Created by{" "}
              <a
                href="https://www.linkedin.com/in/haseeb-raza-00a845231/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Haseeb Raza
              </a>
            </span>
          </div>
        </div>
      </div>
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
          {error}
        </p>
      )}
      <main className="main-content">
        <NoteForm
          addNote={addNote}
          updateNote={updateNote}
          selectedNote={selectedNote}
        />
        <NoteList
          notes={notes}
          deleteNote={deleteNote}
          selectNote={selectNote}
        />
      </main>
    </div>
  );
}

export default App;
