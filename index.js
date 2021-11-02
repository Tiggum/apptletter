import express, { response } from 'express'
import createLetter from './createLetter.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import Template from './schemas/template.schema.js'

dotenv.config()
const __dirname = path.resolve()

const port = process.env.PORT || 9001

mongoose
	.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lnar2.mongodb.net/mfr?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => console.log("Connection Success"))

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
    const templates = await Template.find({}, {'name': 1, '_id': 1})
    res.json(templates)
})

app.get('/template/:id', async (req, res) => {
    const id = req.params.id
    const template = await Template.findById(id, {'_id': 0, "__v": 0})
    res.json(template)
})

// app.post('/template', async (req, res) => {
//     const newTemplate = new Template({
//         header: {
//         header1: "Department of the Air Force",
//         subheader1: "United States Space Force",
//         subheader2: "Space Delta 4",
//         enableSFLogo: true
//       },
//       body: {
//         fontSize: 12,
//         date: "",
//         to: "460 SW/CC",
//         from: "CDT",
//         subject: "Example PDF",
//         appointees: {
//           columnHeader: ['1', '2', '3'],
//           rows: [['1', '2', '3']],
//           table: false
//         },
//         paragraphs: ['This', 'is', 'a', 'test']
//       },
//       signature: {
//         name: "caden j reynolds",
//         branch: "USSF",
//         rank: "sgt",
//         position: "Coder"
//       },
//       footer: "latin"
//     })


//     await newTemplate.save()
//     res.send(newTemplate)
// })

const server = app.listen(port, () =>
    console.log(`Listening on port ${server.address().port}`)
);