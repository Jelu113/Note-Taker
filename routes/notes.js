const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, writeToFile } = require('../helpers/fsUtils');

// Route to get all notes
notes.get('/api/notes', (req, res) => {
    // Implement code to read and return notes from your storage (e.g., a JSON file)
    const notesData = readFromFile('./db/db.json');
    notesData.then((data) => {
        const notes = JSON.parse(data);
        res.json(notes);
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
});

// Route to add a new note
notes.post('/api/notes', (req, res) => {
    const newNote = req.body;

    if (!newNote.title || !newNote.text) {
        res.status(400).json({ error: 'Both title and text are required.' });
        return;
    }

    // Generate a unique ID for the new note
    newNote.note_id = uuid();

    // Read existing notes from the storage
    readFromFile('./db/db.json')
        .then((data) => {
            const notes = JSON.parse(data);
            // Add the new note to the existing notes array
            notes.push(newNote);
            // Write the updated notes array back to the storage
            writeToFile('./db/db.json', notes)
                .then(() => res.json(newNote))
                .catch((err) => res.status(500).json({ error: err.message }));
        })
        .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = notes;
