import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {getData} from "../api/index";
import Header from "./Heder"; 
import {postData} from "../api";

export default function CreateComment(props) {

    const [fromUser, setFromUser] = useState(0)
    const [toUser, setToUser] = useState(0)
    const [document, setDocument] = useState(0)
    const [comment, setComment] = useState([])

    const URL = `http://127.0.0.1:8000/sys/comment`

    const fetchAPI = async () => {
        await postData(URL, data)
    }

    const data= {
            "from_user": props.from_user,
            "to_user":  props.to_user,
            "document": props.document,
            "comment": comment
    }

    return (
        <div className="container">
            <p>SAVE YOUR COMMENT HERE</p>
            <input type="text" onChange={(e) => setComment(e.target.value)}/>
            <button onClick={fetchAPI}>submit</button>
        </div>
    )
}