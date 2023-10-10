const express = require("express");
const path = require('path');
const api = require('./routes/index.js');
const fs = require('fs'); // Import the fs module

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static(path.join(__dirname, "public")));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Define the path to your JSON file
const notesFilePath = path.join(__dirname, 'db', 'db.json');

// Route to handle GET requests for retrieving notes
app.get('/api/notes', (req, res) => {
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            const notes = JSON.parse(data);
            res.json(notes);
        }
    });
});

// Route to handle POST requests for creating new notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            const notes = JSON.parse(data);

            // Add the new note to the notes array
            notes.push(newNote);

            // Write the updated notes array back to the JSON file
            fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.json(newNote); // Return the newly created note
                }
            });
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
