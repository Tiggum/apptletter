import express, { response } from 'express'
import createLetter from './createLetter.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

dotenv.config()
const __dirname = path.resolve()

const port = process.env.PORT || 9001

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/post_pdf', async (req, res) => {
    console.log('Ive been hit')
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Access-Control-Allow-Origin': '*',
    })

    createLetter(req.body, (chunk) => stream.write(chunk), () => stream.end())
})

app.get('/template', async (req, res) => {
    res.json({
        header: {
        header1: "Department of the Air Force",
        subheader1: "United States Space Force",
        subheader2: "Space Delta 4",
        enableSFLogo: true
      },
      body: {
        fontSize: 12,
        date: "",
        to: "460 SW/CC",
        from: "CDT",
        subject: "Example PDF",
        appointees: {
          columnHeader: ['1', '2', '3'],
          rows: [['1', '2', '3']],
          table: false
        },
        paragraphs: ['This', 'is', 'a', 'test']
      },
      signature: {
        name: "caden j reynolds",
        branch: "USSF",
        rank: "sgt",
        position: "Coder"
      },
      footer: "latin"
    })
})

const server = app.listen(port, () =>
    console.log(`Listening on port ${server.address().port}`)
);