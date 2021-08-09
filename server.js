// Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const note = require('./db/db.json');
// const enterNote = require('./api/notes.js')

notes = [];

// Sets up the Express App
const app = express();
const PORT = process.env.Port || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// DISPLAY ROUTES
// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/index.html")));
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

//API Route
app.get("./api/notes.js", (req, res) => res.json(note));
// res.json(notes));


// Posts Notes
app.post("./api/notes", (req, res) => {
// const newNote = req.body
// res.JSON(newNote)

    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./public/db/db.json"), "utf8"))
    notes.push(req.body.note)
    fs.writeFileSync(path.join(__dirname, "./public/db/db.json"), JSON.stringify(notes))
    console.log("note submitted")
    res.send("Note success!")
    
})


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
