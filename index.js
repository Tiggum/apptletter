import express from 'express'
import createLetter from './createLetter.js'
import bodyParser from 'body-parser'

const port = 9001

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

const server = app.listen(port, () =>
    console.log(`Listening on port ${server.address().port}`)
);