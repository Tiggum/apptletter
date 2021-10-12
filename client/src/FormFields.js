import react from 'react';
import { useForm } from "react-hook-form"

const FormFields = ({register, handleSubmit}) => {

    const onSubmit = (data) => {
        console.log(data)
    }


    const skeleton = {
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


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Memorandom For" name="to" ref={register("to")}/>
            <input type="text" placeholder="From" name="from" ref={register("from")}/>
            <input type="text" placeholder="Subject" name="subject" ref={register("subject")}/>
            <input type="submit" />
        </form>
    )
}

export default FormFields