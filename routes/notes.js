const express = require("express");
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/notes");
const ensuredLoggedIn = require("../config/ensuredLoggedIn");

const router = express.Router();

router.get("/", ensuredLoggedIn, getNotes);
router.post("/", ensuredLoggedIn, createNote);
router.put("/:id", ensuredLoggedIn, updateNote);
router.delete("/:id", ensuredLoggedIn, deleteNote);

module.exports = router;
