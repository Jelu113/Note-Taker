const express = require("express")
const path = require('path');
// const fs = require("fs");
const api =('./routes/index.js')

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));

//Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api',api);

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*',(req,res) => {
res.sendFile(path.join(__dirname, 'public/notes.html'))
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);