const fs = require('fs')
const PDFDocument = require('pdfkit-table')


data = {
    header: {
        header1: "DEPARTMENT OF THE AIR FORCE",
        subheader1: "UNITED STATES SPACE FORCE",
        subheader2: "SPACE DELTA 4"
    }, 
    body: {
        fontSize: 12,
        date: '22Sep2021',
        to: '86 AW/SC',
        from: 'Sgt Caden Reynolds',
        subject: 'Unit Security Managers',
        appointees: [
            {
                name: 'caden',
                role: 'primary',
                email: 'caden@mail.com'
            },
            {
                name: 'yordt',
                role: 'alternate',
                email: 'yordt@email.com'
            }
        ],
        paragraphs: [
            'In accordance with aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            'contains fouo',
            'please contact for more info'
        ]
    },
    footer: "Videmus Mundum",
    signature: {
        name: "CADEN J. REYNOLDS",
        branch: "USSF",
        rank: "Sgt",
        position: "Supra Coder"
    }
}


const createLetter = (path) => {
    let doc = new PDFDocument({size: 'Letter', margins: {top: .63*72, bottom: 72, left: 72, right: 72}})

    generateHeader(data.header, doc)
    generateAddress(data.body, doc)
    generateBody(data.body, doc)
    generateSignatureBlock(data.signature, doc)
    generateFooter(doc)

    doc.end()
    doc.pipe(fs.createWriteStream(path))
}

const generateHeader = (header, doc) => {
    doc
        .moveDown()
        .fillColor("#000099")
        .fontSize(12)
        .font('./fonts/Copperplate Gothic/Copperplate Gothic Bold Regular.ttf')
        .text(header.header1, {align: "center"})
        .fontSize(10.5)
        .text(header.subheader1, {align: "center"})
        .text(header.subheader2, {align: "center"})
        .image("USSF Logo.png", 6.68 * 72, (.82 * 72) - (.18 * 72), {fit: [.74*72, .97*72], align: 'center', valign: 'center'})
        .image("DoD Seal.png", .62 * 72, (.82 * 72) - (.17 * 72), {fit: [72, 72], align: 'center', valign: 'center'})
        .moveDown()
}

const generateFooter = (doc) => {
    const footer = "Videmus Mundum"
    const center = doc.page.width/2 - doc.widthOfString(footer)/2
    doc
        .fontSize(9)
        .fillColor("#000099")
        .font('./fonts/Copperplate Gothic/Copperplate Gothic Bold Regular.ttf')
        .text(footer, center, doc.page.height - 63, {lineBreak: false} )
}

const generateSignatureBlock = (signer, doc) => {
    const topLine = `${signer.name}, ${signer.rank}, ${signer.branch}`
    const spaceWidth = (7.5 * 72) - (4.5*72)
    const textWidth = doc.widthOfString(topLine)
    
    if (textWidth > spaceWidth){
        doc
        .moveDown(3)
        .font('./fonts/Trebuchet MS/TREBUC.TTF')
        .fillColor('black')
        .fontSize(12)
        .text( topLine, {indent: doc.page.width - 72*2 - textWidth} )
        .text(signer.position, {indent: doc.page.width - 72*2 - textWidth})
    } else {
        doc
        .moveDown(3)
        .font('./fonts/Trebuchet MS/TREBUC.TTF')
        .fillColor('black')
        .fontSize(12)
        .text(
            topLine,
            {indent: 3.5*72} 
        )
        .text(signer.position, {indent:3.5*72})
    }
}

const generateAddress = (body, doc) => {
    doc
        .font('./fonts/Trebuchet MS/TREBUC.TTF')
        .fillColor('black')
        .fontSize(12)
        .text('', 72, 72*2, {align: 'right'})
        .moveDown()
        .text(`MEMORANDUM FOR  ${body.to.toUpperCase()}`)
        .moveDown()
        .text(`FROM:  ${body.from.toUpperCase()}`)
        .moveDown()
        .text(`SUBJECT:  ${body.subject.toUpperCase()}`)
}

const generateBody = (body, doc) => {
    doc.moveDown()
    const indent = doc.widthOfString('2.  ')
    for (let i = 0; i < body.paragraphs.length; i++){
        if (i = 0){

        }
        
        doc
            .text(`${i+1}.`, {continued: true})
            .text('')
            .text(body.paragraphs[i], 72+indent)
            .text('', 72)
            .moveDown()
    }
        
}


createLetter('./test.pdf')