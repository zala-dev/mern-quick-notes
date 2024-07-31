import sendNoteRequest from "./send-request-notes";
const BASE_URL = "/api/notes";

export function fetchNotes() {
  return sendNoteRequest(BASE_URL);
}

export function addNote(noteData) {
  return sendNoteRequest(BASE_URL, "POST", noteData);
}

export function deleteNote(id) {
  return sendNoteRequest(`${BASE_URL}/${id}`, "DELETE");
}

export function editNote(id, noteData) {
  return sendNoteRequest(`${BASE_URL}/${id}`, "PUT", noteData);
}
