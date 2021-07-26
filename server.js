const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//display notes html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//display index html
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get("/api/notes", function(req, res) {
    res.json(db);
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    db.push(newNote);
    newNote.id = uuidv4();
    updateDb();
    return console.log("Added new note: "+newNote.title);
});

function updateDb() {
    fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
        if (err) throw err;
        return true;
    });
}
app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});