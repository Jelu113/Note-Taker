const path = require ('path')
const app = require ("express")


app.request('/static', express.static(path.join(__dirname, "public")))