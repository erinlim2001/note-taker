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

app.get("/api/notes", function(req, res) {
    res.json(db);
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    db.push(newNote);
    newNote.id = uuidv4();
    updateDb();
    res.send(db);
});

app.get("/api/notes/:id", function(req,res) {
    res.json(notes[req.params.id]);
});

function updateDb() {
    fs.writeFile("db/db.json",JSON.stringify(db,'\t'),err => {
        if (err) throw err;
    });
}

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.delete("/api/notes/:id", function(req, res) {
    db.splice(req.params.id, 1);
    updateDb();
    res.send(db);
});

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});