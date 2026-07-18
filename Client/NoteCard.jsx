function NoteCard({ note, onDelete }) {
  return (
    <div className="note-card">
      <h2>{note.title}</h2>
      <h4>{note.subject}</h4>
      <p>{note.content}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
}

export default NoteCard;
