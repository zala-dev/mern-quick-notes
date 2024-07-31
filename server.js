require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");

const app = express();

const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));
// app.use(require("./config/auth"));

app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
