// Dependencies
const express = require("express");
const path = require("path");
// const db = require('./publc/assets/js/index');
// const fs = require('fs');

const notes = [];

// Sets up the Express App
const app = express();
const PORT = process.env.Port || 80;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// DISPLAY ROUTES
// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "public/notes.html"))
);

//API Route
app.get('/api/notes', (req, res) =>
    res.json(notes));

// res.json(notes));
app.post('/api/notes', (req, res) => {
    const addNote = req.body;
    res.json(addNote);
}

// Posts Notes
// app.post("./api/notes", (req, res) => {
// const newNote = req.body
// res.JSON(newNote)

//     let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./public/db/db.json"), "utf8"))
//     getNotes.push(req.body.note)
//     fs.writeFileSync(path.join(__dirname, "../public/db/db.json"), JSON.stringify(notes))
//     console.log("note submitted")
//     res.send("Note success!")
);


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
