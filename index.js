const express = require('express')
const createLetter = require('./createLetter.js')
require('dotenv').config()
const bodyParser = require('body-parser')
const path = require("path");

//const __dirname = path.resolve()

const port = process.env.PORT || 9001

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/post_pdf', async (req, res) => {
    console.log('Ive been hit')
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
        // 'Content-Disposition': 'attachment; filename=appointmentletter.pdf',
    })

    createLetter(req.body, (chunk) => stream.write(chunk), () => stream.end())
})

app.use(express.static(path.resolve(__dirname, "./client/build")))
app.get("*", (req, res) => {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
})

const server = app.listen(port, () =>
    console.log(`Listening on port ${server.address().port}`)
);