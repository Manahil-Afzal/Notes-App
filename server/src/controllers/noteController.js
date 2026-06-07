const Note = require("../models/Note");

// GET /api/notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });

    const payload = notes.map((n) => ({
      id: n._id,
      title: n.title,
      content: n.content,
      imageDataUrl: n.imageDataUrl,
      color: n.color,
      createdAt: n.createdAt ? n.createdAt.toLocaleString() : null,
      updatedAt: n.updatedAt ? n.updatedAt.toLocaleString() : null
    }));

    res.json(payload);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch notes" });
  }
};

// POST /api/notes
const createNote = async (req, res) => {
  try {
    const { title, content, imageDataUrl, color } = req.body;

    const created = await Note.create({
      title: title || "",
      content: content || "",
      imageDataUrl: imageDataUrl || null,
      color: color || "#F79D45"
    });

    res.status(201).json({
      id: created._id,
      title: created.title,
      content: created.content,
      imageDataUrl: created.imageDataUrl,
      color: created.color,
      createdAt: created.createdAt ? created.createdAt.toLocaleString() : null,
      updatedAt: created.updatedAt ? created.updatedAt.toLocaleString() : null
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create note" });
  }
};

// PUT /api/notes/:id
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageDataUrl, color } = req.body;

    const updated = await Note.findByIdAndUpdate(
      id,
      {
        title: title ?? "",
        content: content ?? "",
        imageDataUrl: imageDataUrl ?? null,
        color: color ?? "#F79D45"
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Note not found" });

    res.json({
      id: updated._id,
      title: updated.title,
      content: updated.content,
      imageDataUrl: updated.imageDataUrl,
      color: updated.color,
      createdAt: updated.createdAt ? updated.createdAt.toLocaleString() : null,
      updatedAt: updated.updatedAt ? updated.updatedAt.toLocaleString() : null
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update note" });
  }
};

// DELETE /api/notes/:id
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Note.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete note" });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };

