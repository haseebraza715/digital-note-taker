import React, { useState, useEffect } from "react";

function NoteForm({ addNote, updateNote, selectedNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setTags(selectedNote.tags.join(", "));
    } else {
      resetForm();
    }
  }, [selectedNote]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const noteData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    if (selectedNote) {
      updateNote(selectedNote.title, noteData);
    } else {
      addNote(noteData);
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedNote ? "Edit Note" : "Add Note"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">{selectedNote ? "Update Note" : "Add Note"}</button>
    </form>
  );
}

export default NoteForm;
