const Note = require("../models/note");

async function getNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function createNote(req, res) {
  try {
    const { text } = req.body;
    // console.log("Create Note BODY UserId: ", req.user.id);

    const note = new Note({ text, user: req.user.id });
    // console.log("NEW NOTE DATA: ", note);
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteNote(req, res) {
  // console.log("Delete Note Called....");
  // console.log("Id: ", req.params);
  try {
    await Note.deleteOne({ _id: req.params.id });
    res.json({ message: "Note deleted!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateNote(req, res) {
  // console.log("Update Note Called....");
  // console.log("Id: ", req.params.id);
  // console.log("Update Data: ", req.body);

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (err) {
    console.error("Error updating note: ", err.message);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
