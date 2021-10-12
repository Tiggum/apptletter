"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pdfkitTable = require("pdfkit-table");

var _pdfkitTable2 = _interopRequireDefault(_pdfkitTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {
    header: {
        header1: "DEPARTMENT OF THE AIR FORCE",
        subheader1: "UNITED STATES SPACE FORCE",
        subheader2: "SPACE DELTA 4"
    },
    body: {
        fontSize: 10,
        date: '22Sep2021',
        to: '86 AW/SC',
        from: 'Sgt Caden Reynolds',
        subject: 'Unit Security Managers',
        appointees: [{
            name: 'caden',
            role: 'primary',
            email: 'caden@mail.com',
            address: 'somewhere not hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
            more: 'more',
            moreeeeeeeeeeeeeeeeeeeeeeeeeeeeee: 'I NEED IT ',
            howFar: 'can this go',
            weStray: 'From gods light',
            'Security Clearance': 'long names am i right',
            'can we add some more': 'you betcha'
        }, {
            name: 'yordt',
            role: 'alternate',
            email: 'yordt@email.com'
        }, {
            name: 'beck',
            role: 'overlord',
            email: 'beck@mail.com'
        }],
        paragraphs: ['In accordance with aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'contains fouo', 'please contact for more info']
    },
    footer: "Videmus Mundum",
    signature: {
        name: "caden J. REYNOLDS",
        branch: "UssF",
        rank: "Sgt",
        position: "Supra Coder"
    }
};

var fontSize = 12;

var createLetter = function createLetter(data, dataCallback, endCallback) {
    var doc = new _pdfkitTable2.default({ size: 'Letter', margins: { top: .63 * 72, bottom: 72, left: 72, right: 72 } });
    doc.registerFont('Body', 'fonts/Trebuchet MS/TREBUC.TTF');
    doc.registerFont('Header', 'fonts/Copperplate Gothic/COPRGTB.TTF');

    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    fontSize = data.body.fontSize;
    generateHeader(data.header, doc);
    generateAddress(data.body, doc);
    generateBody(data.body, doc);
    generateSignatureBlock(data.signature, doc);
    generateFooter(data.footer, doc);

    doc.end();
};

var generateHeader = function generateHeader(header, doc) {
    doc.fillColor("#000099").fontSize(12).font('fonts/Copperplate Gothic/COPRGTB.TTF').text('', 72, 45, { continued: true }).text(header.header1.toUpperCase(), { align: "center" }).fontSize(10.5).text(header.subheader1.toUpperCase(), { align: "center" }).text(header.subheader2.toUpperCase(), { align: "center" }).image("USSF Logo.png", doc.page.width - 72 - .77 * 72 / 2, 36, { height: 72 }).image("DoD Seal.png", 36, 36, { fit: [72, 72] }).moveDown();
};

var generateFooter = function generateFooter(footer, doc) {
    var center = doc.page.width / 2 - doc.widthOfString(footer) / 2;
    doc.fontSize(9).fillColor("#000099").font('fonts/Copperplate Gothic/COPRGTB.TTF').text(footer, center, doc.page.height - 63, { lineBreak: false });
};

var generateSignatureBlock = function generateSignatureBlock(signer, doc) {
    var topLine = signer.name.toUpperCase() + ", " + signer.rank + ", " + signer.branch.toUpperCase();
    var spaceWidth = 7.5 * 72 - 4.5 * 72;
    var textWidth = doc.widthOfString(topLine);

    if (textWidth > spaceWidth) {
        doc.moveDown(3).font('./fonts/Trebuchet MS/TREBUC.TTF').fillColor('black').text(topLine, { indent: doc.page.width - 72 * 2 - textWidth }).text(signer.position, { indent: doc.page.width - 72 * 2 - textWidth });
    } else {
        doc.moveDown(3).font('./fonts/Trebuchet MS/TREBUC.TTF').fillColor('black').text(topLine, { indent: 3.5 * 72 }).text(signer.position, { indent: 3.5 * 72 });
    }
};

var generateAddress = function generateAddress(body, doc) {
    doc.font('./fonts/Trebuchet MS/TREBUC.TTF').fillColor('black').fontSize(body.fontSize).text('', 72, 72 * 2, { align: 'right' }).moveDown().text("MEMORANDUM FOR  " + body.to.toUpperCase()).moveDown().text("FROM:  " + body.from.toUpperCase()).moveDown().text("SUBJECT:  " + body.subject.toUpperCase());
};

var generateBody = function generateBody(body, doc) {
    doc.moveDown();
    var indent = doc.widthOfString('2.  ');
    for (var i = 0; i < body.paragraphs.length; i++) {
        console.log(body.paragraphs[i]);
        doc.text(i + 1 + ".", { continued: true }).text('').text(body.paragraphs[i], 72 + indent).text('', 72).moveDown();

        if (i === 0 && body.appointees.length !== 0) {
            var rows = [];

            for (var j = 0; j < body.appointees.length; j++) {
                rows.push(Object.values(body.appointees[j]));
            }

            var tableJson = {
                headers: Object.keys(body.appointees[0]),
                rows: rows
            };

            doc.table(tableJson, {
                prepareHeader: function prepareHeader() {
                    return doc.font('Body').fontSize(fontSize);
                },
                prepareRow: function prepareRow(row, indexColumn, indexRow, rectRow) {
                    doc.font('Body').fontSize(fontSize);
                }
            });
        }
    }
};

exports.default = createLetter;
//# sourceMappingURL=createLetter.js.map