const express = require("express")
const path = require('path');
// const fs = require("fs");
// const dbroutes = require("./db/db.json")

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.fs());

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*',(req,res) => {
res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// app.post('/db/db.json',(req, res)=> {
//     console.info(`${req.method} request was received`);
//     let response;

//     if (req.body && req.body.product) {
//         response ={
//             status:'success',
//             data: req.body,
//         };
//         res.json (`${response.data.product} has been added`);
//     }else{
//         res.json('Request not complete.')
//     }
// });


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);