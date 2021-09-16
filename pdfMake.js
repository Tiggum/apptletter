var fonts = {
    Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique'
    },
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    },
    Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic'
    },
    CopperplateGothic: {
        normal: 'fonts/Copperplate Gothic/Copperplate Gothic Bold Regular.ttf'
    },
    Symbol: {
        normal: 'Symbol'
    },
    ZapfDingbats: {
        normal: 'ZapfDingbats'
    }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
    pageSize: 'letter',
    pageMargin: [45, 72, 72, 72],
    content: [
        { 
            stack: [
                { text: 'DEPARTMENT OF THE AIR FORCE', style: 'header' },
                { text: 'UNITED STATES SPACE FORCE', style: 'subHeader' },
                { text: 'SPACE DELTA 4', style: 'subHeader' },
            ],
        },
        { image: 'DoD Seal.png', fit: [45, 0.62*72, 45]},
        { image: 'USSF Logo.png', fit: [.74*72, .97*72], absolutePosition: {x: 7.68*72-.74*72, y:.62*72}},


    ],
    footer: {

    },
    styles: {
        header: {
            font: 'CopperplateGothic',
            alignment: 'center',
            color: '#000099',
            fontSize: 12
        },
        subHeader: {
            font: 'CopperplateGothic',
            alignment: 'center',
            color: '#000099',
            fontSize: 10.5
        },
        footer: {
            font: 'CopperplateGothic',
            fontSize: 9
        }
    }
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();