const express = require('express');

// Import our modular routers for /tips and /feedback
 const dbrouter = require('./db/db.json');
// const feedbackRouter = require('./feedback');
// const diagnosticsRouter = require('./diagnostics');

const app = express();

app.use(dbrouter, title);
// app.use('/feedback', feedbackRouter);
// app.use('/diagnostics', diagnosticsRouter);

module.exports = app;
