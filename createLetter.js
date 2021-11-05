import PDFDocument from 'pdfkit-table'

let fontSize = 12

const createLetter = (data, dataCallback, endCallback) => {
    
    let doc = new PDFDocument({size: 'Letter', margins: {top: .63*72, bottom: 72, left: 72, right: 72}})
    doc.registerFont('Trebuchet', 'fonts/Trebuchet MS/TREBUC.TTF')
    doc.registerFont('Header', 'fonts/Copperplate Gothic/COPRGTB.TTF')
    data.font = data.font || 'Times-Roman'

    console.log(data.font)
    doc.on('data', dataCallback)
    doc.on('end', endCallback)
    fontSize = data.body.fontSize
    generateHeader(data.header, doc)
    generateAddress(data.body, doc, data.font)
    generateBody(data.body, doc, data.font)
    generateSignatureBlock(data.signature, doc, data.font)
    generateFooter(data.footer, doc)

    doc.end()
}

const generateHeader = (header, doc) => {
    doc
        .fillColor("#000099")
        .fontSize(12)
        .font('Header')
        .text('', 72, 45, {continued: true})
        .text(header.header1.toUpperCase(), {align: "center"})
        .fontSize(10.5)
        .text(header.subheader1.toUpperCase(), {align: "center"})
        .text(header.subheader2.toUpperCase(), {align: "center"})
        .image("DoD Seal.png", 36, 36, {fit: [72, 72], })
        if ( header.enableSFLogo ) {
            doc.image("USSF Logo.png", doc.page.width - 72 - .77*72/2, 36, {height: 72})
        }
        doc.moveDown()
}

const generateFooter = (footer, doc) => {
    const center = doc.page.width/2 - doc.widthOfString(footer)/2
    doc
        .fontSize(9)
        .fillColor("#000099")
        .font('Header')
        .text(footer, center, doc.page.height - 63, {lineBreak: false} )
}

const generateSignatureBlock = (signer, doc, font) => {
    const topLine = `${signer.name.toUpperCase()}, ${signer.rank}, ${signer.branch.toUpperCase()}`
    const spaceWidth = (7.5 * 72) - (4.5*72)
    const textWidth = doc.widthOfString(topLine)
    
    if (textWidth > spaceWidth){
        doc
        .moveDown(3)
        .font(font)
        .fillColor('black')
        .text( topLine, {indent: doc.page.width - 72*2 - textWidth} )
        .text(signer.position, {indent: doc.page.width - 72*2 - textWidth})
    } else {
        doc
        .moveDown(3)
        .font(font)
        .fillColor('black')
        .text(
            topLine,
            {indent: 3.5*72} 
        )
        .text(signer.position, {indent:3.5*72})
    }
}

const generateAddress = (body, doc, font) => {
    doc
        .font(font)
        .fillColor('black')
        .fontSize(body.fontSize)
        .text('', 72, 72*2, {align: 'right'})
        .moveDown()
        .text(`MEMORANDUM FOR  ${body.to.toUpperCase()}`)
        .moveDown()
        .text(`FROM:  ${body.from.toUpperCase()}`)
        .moveDown()
        .text(`SUBJECT:  ${body.subject}`)
}

const generateBody = (body, doc, font) => {
    doc.moveDown()
    const indent = doc.widthOfString('2.  ')
    for (let i = 0; i < body.paragraphs.length; i++){
        doc
            .text(`${i+1}.`, {continued: true})
            .text('')
            .text(body.paragraphs[i], 72+indent)
            .text('', 72)
            .moveDown()

        if ( i === 0 && body.appointees.table ){
            
            const tableJson = {
                headers: body.appointees.columnHeader,
                rows: body.appointees.rows
            }
        
            doc.table(tableJson, {
                prepareHeader: () => doc.font(font).fontSize(fontSize),
                prepareRow: (row, indexColumn, indexRow, rectRow) => {
                    doc.font(font).fontSize(fontSize)
                }
            })
        }
    }   
}


export default createLetter