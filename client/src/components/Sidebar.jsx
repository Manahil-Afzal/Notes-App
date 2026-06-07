function Sidebar({ setShowColors, onNewNote }) {
  return (
    <div className="sidebar">
      <h1>Notes</h1>

      <button
        className="new-note-btn"
        type="button"
        onClick={onNewNote}
        aria-label="New note"
      >
        +
      </button>

      <button
        className="cross-btn"
        onClick={() => setShowColors(true)}
      >
        ✕
      </button>
    </div>
  );
}

export default Sidebar;