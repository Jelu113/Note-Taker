const express = require("express")
const path = require('path');
const fs= require("fs");
const dbroutes = require("./db/db.json")


const PORT = 3001;

const app = express();

app.get("/api", (req, res)=> res.json(dbroutes));

    app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT,()=>
console.log(`App listening at http://localhost:${PORT}`)
);