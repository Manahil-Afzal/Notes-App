# Notes App TODO

## Backend (Express + Mongo)
- [ ] Implement `server/src/models/Note.js` (Mongoose schema)
- [ ] Implement `server/src/controllers/noteController.js` (CRUD handlers)
- [ ] Implement `server/src/routes/noteRoutes.js` (routes wiring)
- [ ] Update `server/src/server.js` to mount `/api/notes`

## Frontend (React)
- [ ] Add API client calls using axios to fetch/create/update/delete notes
- [ ] Update `client/src/pages/Home.jsx` to load notes from backend on mount
- [ ] Update `client/src/ components/NoteEditor.jsx` save flow to call backend (POST/PUT)
- [ ] Update `client/src/components/NotesList.jsx` delete flow to call backend (DELETE)
- [ ] Update view/edit selection to work with backend ids

## Testing
- [ ] Run backend + frontend and verify CRUD works end-to-end
- [ ] Confirm images (imageDataUrl) persist correctly in MongoDB

