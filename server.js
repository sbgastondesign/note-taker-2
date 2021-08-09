const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;
// Set up Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
let notes = require("./db/db.json");

// Routes
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../public", "/index.html")));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public", "/notes.html")));

// Display notes
app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
// Create new note
app.post("/api/notes", (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
  };
  notes.push(newNote);
  const stringifyNote = JSON.stringify(notes);
  res.json(notes);
  fs.writeFile("db/db.json", stringifyNote, (err) => {
    if (err) console.log(err);
    else {
      console.log("Note successfully saved to db.json");
    }});
})
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
