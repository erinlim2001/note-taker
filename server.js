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

app.post("/api/notes", (req, res) => {
    console.log(`Hitting the API/Notes Route (with post request)`);

        let newNote = req.body;
        newNote.id = uuidv4();
        db.push(newNote);
        fs.writeFileSync("./db/db.json", JSON.stringify(db), (err) => {if(err) throw err;});
        res.send(db)
})

app.listen(PORT, () => {
    console.log(`listening ${PORT}`);
});