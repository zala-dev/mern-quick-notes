require("dotenv").config();
require("../config/db");

const express = require("express");
const app = express();

const logger = require("morgan");
const path = require("path");
const favicon = require("serve-favicon");

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.DEV_PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
