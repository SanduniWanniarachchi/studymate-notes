useEffect(() => {
  fetch("http://localhost:5000/api/notes")
    .then(res => res.json())
    .then(data => {
      setNotes(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
});

const addNote = (note) => {
  fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  })
    .then(res => res.json())
    .then(savedNote => setNotes([...notes, savedNote]));
};

const deleteNote = (id) => {
  fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" })
    .then(() => setNotes(notes.filter(n => n._id !== id)));
};
