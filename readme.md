# 📝 Notes App (Full Stack MERN)


A full-stack Notes Application built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.  
It allows users to create, edit, delete, and manage rich-text notes with colors, images, and links.
Live Demo : https://notes-app-front-orpin.vercel.app/

---

# 🚀 Features

✔ Create Notes  
✔ Edit Notes  
✔ Delete Notes  
✔ Rich Text Editor (bold, italic, links)  
✔ Color tagging for notes  
✔ Image upload (base64 support)  
✔ Real-time UI updates  
✔ MongoDB cloud storage  

---

# 🧰 Tech Stack

## 🎨 Frontend
- React.js
- Vite
- Axios
- CSS 

## ⚙️ Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

# 🧠 Why this Tech Stack?

## ⚛️ React.js
Used for building a dynamic and reusable UI.

- Component-based structure (NoteEditor, NotesList)
- Fast rendering using virtual DOM
- Smooth user experience

---

## ⚡ Vite
Modern build tool for React.

- Extremely fast development server
- Instant hot module replacement
- Lightweight compared to CRA

---

## 🔗 Axios
Used for API communication between frontend and backend.

- Easy HTTP requests (GET, POST, PUT, DELETE)
- Automatic JSON handling
- Cleaner syntax than fetch

---

## 🟢 Node.js
Backend runtime environment.

- Handles server-side logic
- Fast and scalable
- Uses JavaScript everywhere

---

## 🚀 Express.js
Backend framework for APIs.

- Simple routing system
- Middleware support
- Ideal for REST APIs

---

## 🍃 MongoDB
NoSQL database for storing notes.

- Flexible schema (JSON format)
- Stores text, images, metadata
- Scales easily

---

## 🧩 Mongoose
ODM for MongoDB.

- Schema-based data structure
- Easy validation
- Simplifies database operations

---


# 🔄 How It Works

1. User creates or edits a note in React UI  
2. Axios sends request to backend API  
3. Express routes handle request  
4. Controller processes logic  
5. MongoDB stores/retrieves data  
6. Response is sent back to frontend  
7. UI updates instantly  

---

# 📁 Project Structure

## Backend
```
server/
 ┣ config/
 ┃ ┗ db.js
 ┣ controllers/
 ┃ ┗ noteController.js
 ┣ models/
 ┃ ┗ Note.js
 ┣ routes/
 ┃ ┗ noteRoutes.js
 ┗ server.js
```

## Frontend
```
client/
 ┣ api/
 ┃ ┗ notesApi.js
 ┣ components/
 ┃ ┣ NoteEditor.jsx
 ┃ ┣ NotesList.jsx
 ┃ ┣ NoteCard.jsx
 ┃ ┣ Sidebar.jsx
 ┃ ┗ ColorPicker.jsx
 ┣ pages/
 ┃ ┗ Home.jsx
 ┣ services/
 ┃ ┗ noteApi.js
 ┣ App.jsx
 ┗ main.jsx
```

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/notes | Get all notes |
| POST | /api/notes | Create note |
| PUT | /api/notes/:id | Update note |
| DELETE | /api/notes/:id | Delete note |

---

# 🧪 Testing

✔ Backend + frontend connected  
✔ CRUD operations working  
✔ MongoDB Atlas storing data  
✔ Image + text saving properly  

---

# 📦 Installation

## Backend
```bash
cd server
npm install
npm run dev
```

## Frontend
```bash
cd client
npm install
npm run dev
```

---

# ⚠️ Environment Variables

Create `.env` in server:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

# ⭐ Future Improvements

- Authentication (JWT login system)
- Cloud image upload (Cloudinary)
- Search and filter notes
- Drag & drop notes
- Notion-style UI upgrade

---
