function NotesList({
  notes,
  onViewClick,
  onEditClick,
  onDeleteClick
}) {
  return (
    <div className="notes-list">
      <h2>Notes</h2>

      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <div className="note-row">
            <div
              className="note-title"
              onClick={() => onViewClick(note)}
            >
              <div
                className="note-color-dot"
                aria-hidden="true"
                style={{ backgroundColor: note.color || "#ddd" }}
              />
              <h4>{note.title}</h4>
            </div>


            <div className="note-actions">
              <button
                className="edit-icon"
                type="button"
                aria-label="Edit note"
                onClick={() => onEditClick(note)}
              >
                ✎
              </button>

              <button
                className="delete-icon"
                type="button"
                aria-label="Delete note"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDeleteClick) onDeleteClick(note);
                }}
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;



