import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import Button from '@mui/material/Button';


export default function PDFViewer({pdf}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // useEffect(() => {
  //   const fetchPdf = async () => {
  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     var raw = JSON.stringify({ "header": { "header1": "DEPARTMENT OF THE AIR FORCE", "subheader1": "UNITED STATES SPACE FORCE", "subheader2": "SPACE DELTA 4" }, "body": { "fontSize": 12, "date": "22Sep2021", "to": "86 AW/SC", "from": "Sgt Caden Reynolds", "subject": "Unit Security Managers", "appointees": [{ "name": "caden", "role": "primary", "email": "caden@mail.com", "address": "somewhere not hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "more": "more", "moreeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "I NEED IT ", "howFar": "can this go", "weStray": "From gods light", "Security Clearance": "long names am i right", "can we add some more": "you betcha" }, { "name": "yordt", "role": "alternate", "email": "yordt@email.com" }, { "name": "beck", "role": "overlord", "email": "beck@mail.com" }], "paragraphs": ["In accordance with aaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "contains fouo", "please contact for more info"] }, "footer": "Videmus Mundum", "signature": { "name": "CADEN J. REYNOLDS", "branch": "USAF", "rank": "Sgt", "position": "Supra Coder" } });

  //     var requestOptions = {
  //       method: 'POST',
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: 'follow'
  //     };

  //     const res = await fetch("/post_pdf", requestOptions)
  //       .then(response => response.blob())


  //     setPdf(res)
  //   }

  //   fetchPdf()
  // }, [])



  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <Button variant='contained' disabled={pageNumber <= 1}
          onClick={previousPage}>Previous</Button>
        <Button
          variant="contained"
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </Button>
      </div>
    </>
  );
}