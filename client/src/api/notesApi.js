import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://notes-app-beta-lac.vercel.app";

export function getNotes() {
  return axios.get(`${API_BASE_URL}/api/notes`);
}

export function createNote({ title, content, imageDataUrl, color }) {
  return axios.post(`${API_BASE_URL}/api/notes`, {
    title,
    content,
    imageDataUrl,
    color
  });
}

export function updateNote(id, { title, content, imageDataUrl, color }) {
  return axios.put(`${API_BASE_URL}/api/notes/${id}`, {
    title,
    content,
    imageDataUrl,
    color
  });
}

export function deleteNote(id) {
  return axios.delete(`${API_BASE_URL}/api/notes/${id}`);
}

