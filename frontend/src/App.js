import React, { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import axios from "axios";
import "./App.css";
import { FaUser } from "react-icons/fa";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [error, setError] = useState("");
  const [usingLocalStorage, setUsingLocalStorage] = useState(false);

  useEffect(() => {
    document.body.classList.add(isDarkTheme ? "dark-theme" : "light-theme");
    document.body.classList.remove(isDarkTheme ? "light-theme" : "dark-theme");
  }, [isDarkTheme]);

  // Check if Flask backend is running on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await axios.get("http://127.0.0.1:5000/notes");
        setUsingLocalStorage(false);
        console.log("Connected to Flask backend.");
        fetchNotes();
      } catch (error) {
        console.warn(
          "Flask backend not available, switching to local storage."
        );
        setUsingLocalStorage(true);
        loadNotesFromLocalStorage();
      }
    };
    checkBackend();
  }, []);

  // Fetch notes from Flask if available, otherwise from local storage
  const fetchNotes = async () => {
    if (usingLocalStorage) {
      loadNotesFromLocalStorage();
    } else {
      try {
        const response = await axios.get("http://127.0.0.1:5000/notes");
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setError("Error fetching notes.");
      }
    }
  };

  // Load notes from local storage
  const loadNotesFromLocalStorage = () => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  };

  // Save notes to local storage
  const saveNotesToLocalStorage = (newNotes) => {
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  // Add a new note
  const addNote = async (note) => {
    if (notes.some((n) => n.title === note.title)) {
      alert("A note with this title already exists!");
      return;
    }

    if (usingLocalStorage) {
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
    } else {
      try {
        await axios.post("http://127.0.0.1:5000/notes", note);
        fetchNotes();
      } catch (error) {
        console.error("Error adding note:", error);
        setError("Error adding note.");
      }
    }
  };

  // Update an existing note
  const updateNote = async (id, updatedContent) => {
    if (usingLocalStorage) {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, ...updatedContent } : note
      );
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
    } else {
      try {
        await axios.put(`http://127.0.0.1:5000/notes/${id}`, updatedContent);
        fetchNotes();
        setSelectedNote(null);
      } catch (error) {
        console.error("Error updating note:", error);
        setError("Error updating note.");
      }
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    if (usingLocalStorage) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
    } else {
      try {
        await axios.delete(`http://127.0.0.1:5000/notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.error("Error deleting note:", error);
        setError("Error deleting note.");
      }
    }
  };

  // Select a note to edit
  const selectNote = (note) => {
    setSelectedNote(note);
  };

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div
      className={`app-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}
    >
      <div className="header">
        <div className="title-container">
          <h1>Digital Note-Taker</h1>
        </div>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
          </button>
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
