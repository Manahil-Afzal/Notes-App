import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ColorModal from "../components/ColorModal";
import NotesList from "../components/NotesList";
import NoteEditor from "../components/NoteEditor";
import { deleteNote as apiDeleteNote, getNotes } from "../api/notesApi";



function Home() {
  const refreshNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  useEffect(() => {
    refreshNotes().catch(() => {});
  }, []);

  const [showColors, setShowColors] = useState(false);

  const [selectedColor, setSelectedColor] = useState("#F79D45");

  const [notes, setNotes] = useState([]);

  const [viewNote, setViewNote] = useState(null);
  const [editNote, setEditNote] = useState(null);

  const handleViewClick = (note) => {
    setViewNote(note);
    // keep edit note closed when viewing another note
    setEditNote(null);
    if (note?.color) setSelectedColor(note.color);
  };

  const handleEditClick = (note) => {
    setEditNote(note);
    setViewNote(null);
    if (note?.color) setSelectedColor(note.color);
  };

  const handleEditDone = () => {
    // after saving, return to viewing the note we just edited
    setViewNote(editNote);
    setEditNote(null);
  };

const handleDeleteClick = async (noteToDelete) => {
    await apiDeleteNote(noteToDelete.id);
    await refreshNotes();

    if (viewNote?.id === noteToDelete.id) {
      setViewNote(null);
    }
    if (editNote?.id === noteToDelete.id) {
      setEditNote(null);
    }
  };

  return (
    <div className="app">
      <Sidebar
        setShowColors={setShowColors}
        onNewNote={() => {
          setViewNote(null);
          setEditNote(null);
          setSelectedColor("#F79D45");
        }}
      />


      <NotesList
        notes={notes}
        onViewClick={handleViewClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      <NoteEditor
        notes={notes}
        setNotes={setNotes}
        selectedNote={editNote || viewNote}
        selectedColor={selectedColor}
        mode={editNote ? "edit" : viewNote ? "view" : "none"}
        onEditDone={handleEditDone}
      />


      {showColors && (
        <ColorModal
          setSelectedColor={setSelectedColor}
          setShowColors={setShowColors}
        />
      )}
    </div>
  );
}

export default Home;

