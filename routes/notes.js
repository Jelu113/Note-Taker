const notes = require('express').Router();
const uuid = require('../helpers/uuid');

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  console.info(`${req.method} request received for note`);
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// const express = require('express');
// const router = express.Router();

// // Middleware function
// const myMiddleware = (req, res, next) => {
//   // Perform some tasks
//   console.log('Middleware executed');
//   next();
// };

// // Use the middleware with router.use()
// router.use(myMiddleware);

// // Define your routes and route handlers
// router.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// // Export the router
// module.exports = router;


module.exports = notes;