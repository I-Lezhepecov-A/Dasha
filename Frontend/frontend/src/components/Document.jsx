import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {getData} from "../api/index";
import {getFilteredData} from "../api";
import { DialogContent } from '@material-ui/core';
import CreateComment from "./CreateComment"; 


export default function Document(props) {
    const [dcm, setDcm] = useState(0)
    console.log(props)
    const URL = `http://127.0.0.1:8000/sys/document/${props.match.params.id}`
    useEffect(() => {
        const fetchAPI = async () => {
            setDcm(await getData(URL))
        }
        fetchAPI();
    }, [])

    const [userId, setUserId] = useState()

    useEffect(() => {
        setUserId(localStorage.getItem("id"))
    }, [])

    const file_name = {
        file_name : `/Volumes/Working/Projects/Django_Apps/PAS/Dasha_PAS/FileSys${dcm.file_name}`
    }

    if (!dcm) return(<div></div>)
    return (
        <div className="container">
            <p></p>
            <div className="card text-center">
                <div className="card-header">
                    <p>{dcm.description}</p>
                </div>
                <div className="card-body">
                    <h5 className="card-title">File format is {dcm.type.type}</h5>
                    <h5 className="card-title">This file is added by {dcm.user.username}</h5>
                    <p className="card-text">You can write comments to this Document in the Comments block</p>
                    <a href={file_name.file_name} download={file_name.file_name}>
                        <button className="btn btn-primary" >Download</button>
                    </a>
                </div>
             </div>
            {dcm.comment.map((item) => 
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{item.comment}</h5>
                            <small>3 days ago</small>
                        </div>
                        <p class="mb-1">from {item.from_user.username}</p>
                        <p class="mb-1">to {item.to_user.username}</p>
                        <small>And some small print.</small>
                    </a>
                </div>
            )}
            <CreateComment document={dcm.id} from_user={userId} to_user={dcm.user.id}/>
        </div>
    )
}
