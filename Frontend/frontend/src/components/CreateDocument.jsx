import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {getData} from "../api/index";
import Header from "./Heder"; 
import {postData} from "../api";

export default function CreateDocumnet(props) {

    const [fromUser, setFromUser] = useState(0)
    const [description, setDescription] = useState(0)
    const [filename, setFilename] = useState(0)
    const [userId, setUserId] = useState()

    const URL = `http://127.0.0.1:8000/sys/document`

    const fetchAPI = async () => {
        await postData(URL, data)
    }

    useEffect(() => {
        setUserId(localStorage.getItem("id"))
    }, [])

    const data= {
            "user" : userId,
            "type" : 2,
            "description": description,
            "file_name": filename
    }
    
    return (
        <div className="container">
            <p>document</p>
            <input type="file" onChange={(e) => setFilename(e.target.value)}/>
            <p>description</p>
            <input type="text" onChange={(e) => setDescription(e.target.value)}/>
            <button onClick={fetchAPI}>submit</button>
        </div>
    )
}