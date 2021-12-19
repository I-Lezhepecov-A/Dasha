import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {getData} from "../api/index";
import Header from "./Heder"; 
import {getFilteredData} from "../api";

export default function Documents({documents, setDocuments, userId, setUserId, setDocumentsetCard}) {

    const URL = 'http://127.0.0.1:8000/sys/document'
    useEffect(() => {
        const fetchAPI = async () => {
            setDocuments(await getData(URL))
        }
        fetchAPI();
    }, [])

    return (
        <div className="container">
            <ul className="list-group">
                {documents.length && documents.map((item) => 
                    <div key={item.id}>
                        <li className="list-group-item">{item.description}
                            <div className="float-right>">
                                <Link to={`/documents/${item.id}`}>
                                    <button className="btn btn-primary">INFO</button>
                                </Link>
                            </div>
                        </li>
                    </div>
                )}
            </ul>
        </div>
    )
}



