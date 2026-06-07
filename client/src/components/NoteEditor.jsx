import { useEffect, useRef, useState } from "react";
import LinkCard from "./LinkCard";
import { createNote, updateNote } from "../api/notesApi";

function NoteEditor({
  setNotes,
  selectedColor,
  selectedNote,
  mode,
  onEditDone
}) {
  const [showThanksCard, setShowThanksCard] = useState(false);
  const thanksTimerRef = useRef(null);
  const [title, setTitle] = useState("");

  // Uncontrolled contentEditable to prevent reverse typing/backspace issues
  const editorRef = useRef(null);
  const lastSelectionRef = useRef(null);

  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState(null);

  useEffect(() => {
    if (!(selectedNote && selectedNote.id != null)) return;

    const t = setTimeout(() => {
      setEditingId(selectedNote.id);
      setTitle(selectedNote.title || "");
      setImageDataUrl(selectedNote.imageDataUrl || null);

      if (editorRef.current) {
        editorRef.current.innerHTML = selectedNote.content || "";
        setContent(selectedNote.content || "");
      }
    }, 0);

    return () => clearTimeout(t);
  }, [selectedNote]);

  const syncContentFromEditor = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setContent(html);
    return html;
  };

  const restoreSelectionIfPossible = () => {
    const editorEl = editorRef.current;
    if (!editorEl) return;
    const range = lastSelectionRef.current;
    if (!range) return;

    try {
      if (!editorEl.contains(range.commonAncestorContainer)) return;

      const sel = window.getSelection();
      if (!sel) return;
      sel.removeAllRanges();
      sel.addRange(range);

      editorEl.focus();
    } catch {
      // no-op
    }
  };

  const getAndCaptureSelection = () => {
    const editorEl = editorRef.current;
    if (!editorEl) return;

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    if (!editorEl.contains(range.commonAncestorContainer)) return;

    lastSelectionRef.current = range.cloneRange();
  };

  const execSave = async () => {
    const latestHtml = syncContentFromEditor() || content || "";

    const showThanks = () => {
      if (thanksTimerRef.current) clearTimeout(thanksTimerRef.current);
      setShowThanksCard(true);
      thanksTimerRef.current = setTimeout(() => {
        setShowThanksCard(false);
      }, 2200);
    };

    const trimmedTitle = title.trim();
    const plainText = String(latestHtml).replace(/<[^>]*>/g, "").trim();
    if (!trimmedTitle && !plainText) return;

    try {
      const payload = {
        title: trimmedTitle,
        content: latestHtml,
        imageDataUrl,
        color: selectedColor
      };

      if (editingId != null) {
        const res = await updateNote(editingId, payload);
        const updated = res.data;

        setNotes((prev) =>
          prev.map((n) => (n.id === editingId ? updated : n))
        );

        setEditingId(null);
        if (onEditDone) onEditDone();
        showThanks();
        return;
      }

      const res = await createNote(payload);
      const created = res.data;

      setNotes((prev) => [...prev, created]);
      setTitle("");
      setContent("");
      setImageDataUrl(null);
      setEditingId(null);
      showThanks();
    } catch {
      // keep UI stable; user can retry
    }
  };

  const formatCommand = (cmd, value = null) => {
    if (editorRef.current) editorRef.current.focus();
    document.execCommand(cmd, false, value);
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const onBold = () => formatCommand("bold");
  const onItalic = () => formatCommand("italic");
  const onIncreaseSize = () => formatCommand("fontSize", "6");
  const onDecreaseSize = () => formatCommand("fontSize", "3");

  const normalizeUrl = (raw) => {
    const v = String(raw || "").trim();
    if (!v) return "";
    if (/^https?:\/\//i.test(v)) return v;
    return `https://${v}`;
  };

  const replaceLink = () => {
    getAndCaptureSelection();
    focusEditor();
    setShowLinkCard(true);
  };

  const [showLinkCard, setShowLinkCard] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const submitLink = () => {
    const url = normalizeUrl(linkUrl);
    if (!url) return;

    restoreSelectionIfPossible();
    document.execCommand("createLink", false, url);

    if (editorRef.current) setContent(editorRef.current.innerHTML);

    setShowLinkCard(false);
    setLinkUrl("");
  };

  const cancelLink = () => {
    setShowLinkCard(false);
    setLinkUrl("");
    restoreSelectionIfPossible();
  };

  const focusEditor = () => {
    if (editorRef.current) editorRef.current.focus();
  };

  const handleImagePick = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const createdAt = selectedNote?.createdAt;
  const updatedAt = selectedNote?.updatedAt;

  if (mode === "view") {
    return (
      <div className="note-view" style={{ borderLeftColor: selectedColor }}>
        <h2 className="note-view-title">{selectedNote?.title}</h2>

        {selectedNote?.imageDataUrl && (
          <img
            className="note-view-image"
            src={selectedNote.imageDataUrl}
            alt="Note"
          />
        )}

        <div
          className="note-view-content"
          dangerouslySetInnerHTML={{ __html: selectedNote?.content || "" }}
        />

        {(selectedNote?.createdAt || selectedNote?.updatedAt) && (
          <p className="note-view-meta">
            {selectedNote?.createdAt ? `Created : ${selectedNote.createdAt}` : null}
            {selectedNote?.createdAt && selectedNote?.updatedAt ? " • " : null}
            {selectedNote?.updatedAt ? `Updated : ${selectedNote.updatedAt}` : null}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      {showThanksCard && (
        <div className="thanks-card-overlay" role="status" aria-live="polite">
          <div className="thanks-card">
            <h3>Thanks! ✅</h3>
            <p>Your note has been saved.</p>
          </div>
        </div>
      )}

      <div className="editor" style={{ backgroundColor: selectedColor }}>
        <input
          type="text"
          placeholder={editingId != null ? "Edit note title" : "Enter note title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <LinkCard
          show={showLinkCard}
          url={linkUrl}
          setUrl={setLinkUrl}
          onSubmit={submitLink}
          onCancel={cancelLink}
        />

        <div className="editor-toolbar">
          <button type="button" onClick={onBold} aria-label="Bold">
            Bold
          </button>
          <button type="button" onClick={onItalic} aria-label="Italic">
            Italic
          </button>
          <button
            type="button"
            onClick={onIncreaseSize}
            aria-label="Increase text size"
          >
            A+
          </button>
          <button
            type="button"
            onClick={onDecreaseSize}
            aria-label="Decrease text size"
          >
            A-
          </button>

          <button type="button" onClick={replaceLink} aria-label="Insert link">
            🔗
          </button>
        </div>

        <div
          className="rich-editor"
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
        />

        <div style={{ marginTop: 12 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImagePick(e.target.files?.[0])}
          />
        </div>

        {imageDataUrl && (
          <img
            src={imageDataUrl}
            alt="Note"
            style={{ marginTop: 12, maxWidth: "100%", borderRadius: 10 }}
          />
        )}

        <div className="btns">
          <button onClick={execSave}>
            {editingId != null ? "Save Changes" : "Save"}
          </button>
        </div>

        <p>
          {createdAt ? `Created : ${createdAt}` : null}
          {createdAt && updatedAt ? " • " : null}
          {updatedAt ? `Updated : ${updatedAt}` : null}
        </p>
      </div>
    </>
  );
}

export default NoteEditor;

