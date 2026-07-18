const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory notes store
let notes = [];

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Add a new note
app.post("/notes", (req, res) => {
  const { title, subject, content } = req.body;
  const newNote = { id: Date.now(), title, subject, content };
  notes.push(newNote);
  res.json(newNote);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
