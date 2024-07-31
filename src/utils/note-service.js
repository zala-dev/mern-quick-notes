import * as notesAPI from "./note-api";

export async function fetchNotes() {
  return notesAPI.fetchNotes();
}

export async function addNote(text) {
  return notesAPI.addNote({ text });
}

export async function deleteNote(id) {
  return notesAPI.deleteNote(id);
}

export async function editNote(id, text) {
  return notesAPI.editNote(id, { text });
}
