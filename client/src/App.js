import './App.css';
import PDFViewer from './PDFViewer'
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from 'react';



function App() {
  const [pdf, setPdf] = useState(null)
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [subject, setSubject] = useState('')
  const [header1, setHeader1] = useState('')
  const [subheader1, setSubheader1] = useState('')
  const [subheader2, setSubheader2] = useState('')
  const [fontSize, setFontSize] = useState('')
  const [fullName, setFullName] = useState('')
  const [branch, setBranch] = useState('')
  const [rank, setRank] = useState('')
  const [position, setPosition] = useState('')
  const [footer, setFooter] = useState('')
  const [paragraphs, setParagraphs] = useState([])

  const fetchPdf = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(skeleton);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const res = await fetch("/post_pdf", requestOptions)
      .then(response => response.blob())

      setPdf(res)

  }

  const {register, handleSubmit} = useForm()

  const onSubmit =  (data) => {
    console.log(data)

    const trimmedParagraphs = paragraphs.filter(para => {
      if (para !== '' || para !== null){
        return para
    }})
    
    skeleton.header.header1 = header1 
    skeleton.header.subheader1 = subheader1
    skeleton.header.subheader2 = subheader2

    skeleton.body.to = to
    skeleton.body.from = from
    skeleton.body.subject = subject
    skeleton.body.fontSize = fontSize
    skeleton.body.paragraphs = trimmedParagraphs

    skeleton.footer = footer

    skeleton.signature.name = fullName
    skeleton.signature.branch = branch
    skeleton.signature.rank = rank
    skeleton.signature.position = position

    
    fetchPdf()

}

  let skeleton = {
    "header": {
        "header1": "",
        "subheader1": "",
        "subheader2": ""
    }, 
    "body": {
        "fontSize": 12,
        "date": "",
        "to": "",
        "from": "",
        "subject": "",
        "appointees": [],
        "paragraphs": []
    },
    "footer": "",
    "signature": {
        "name": "",
        "branch": "",
        "rank": "",
        "position": ""
    }
}

const downloadFile = () => {
  if (pdf === null){
    return
  }
  const file = URL.createObjectURL(pdf)
  let tempLink = document.createElement('a')
  tempLink.href = file
  tempLink.setAttribute('download', 'letter.pdf')
  tempLink.click()
}


  return (
    <>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Header" name="header1" onChange={e => setHeader1(e.target.value)}/>
            <input type="text" placeholder="Subheader 1" name="subheader1" onChange={e => setSubheader1(e.target.value)}/>
            <input type="text" placeholder="Subheader 2" name="subheader2" onChange={e => setSubheader2(e.target.value)}/>

            <input type="number" placeholder="fontSize" name="fontSize" onChange={e => setFontSize(e.target.value)}/>
            <input type="text" placeholder="Memorandom For" name="to" onChange={e => setTo(e.target.value)}/>
            <input type="text" placeholder="From" name="from" onChange={e => setFrom(e.target.value)}/>
            <input type="text" placeholder="Subject" name="subject" onChange={e => setSubject(e.target.value)}/>

            <input type="text" placeholder="Footer" name="footer" onChange={e => setFooter(e.target.value)}/>
            
            <input type="text" placeholder="Full Name" name="fullName" onChange={e => setFullName(e.target.value)}/>
            <input type="text" placeholder="Branch" name="branch" onChange={e => setBranch(e.target.value)}/>
            <input type="text" placeholder="Rank" name="rank" onChange={e => setRank(e.target.value)}/>
            <input type="text" placeholder="Position" name="position" onChange={e => setPosition(e.target.value)}/>

            <textarea id="paragraph1" name="paragraph1" rows="4" cols="50" onChange={e => {
              const newParagraphs = paragraphs
              newParagraphs[0] = e.target.value 
              setParagraphs(newParagraphs)
            }}> Paragraph 1 </textarea>
            <textarea id="paragraph2" name="paragraph2" rows="4" cols="50" onChange={e => {
              const newParagraphs = paragraphs
              newParagraphs[1] = e.target.value 
              setParagraphs(newParagraphs)}}> Paragraph 2 </textarea>
            <textarea id="paragraph3" name="paragraph3" rows="4" cols="50" onChange={e => {
              const newParagraphs = paragraphs
              newParagraphs[2] = e.target.value 
              setParagraphs(newParagraphs)}}> Paragraph 3 </textarea>
            <textarea id="paragraph4" name="paragraph4" rows="4" cols="50" onChange={e => {
              const newParagraphs = paragraphs
              newParagraphs[3] = e.target.value 
              setParagraphs(newParagraphs)}}> Paragraph 4 </textarea>

            <input type="submit" />
        </form>
    <PDFViewer pdf={pdf} />
    <button onClick={downloadFile}>Download PDF</button>
    </>
  );
}

export default App;
