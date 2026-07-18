import { useState, useEffect } from "react";
import NoteForm from "./NoteForm";
import NoteCard from "./NoteCard";
import "./index.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch notes from API
  useEffect(() => {
    fetch("http://localhost:5000/notes") // replace with your API
      .then(res => res.json())
      .then(data => {
        setNotes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Add new note
  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  // Filter notes
  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>StudyMate Notes</h1>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <NoteForm onAdd={addNote} />

      {loading ? (
        <p>Loading...</p>
      ) : filteredNotes.length === 0 ? (
        <p>No notes yet — add your first one!</p>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <NoteCard key={note.id} note={note} onDelete={deleteNote} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
