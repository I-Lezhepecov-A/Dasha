import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import { Nav } from 'react-bootstrap';
// import './Header.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {getFilteredData} from "../api";
import Login from "./Login"; 


export default function Header({user, setUser, userId, setUserId, setCard}) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const search = async () => {
        setCard(await getFilteredData({
            user: userId
        }))
    }


    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="#">File System by Naumchik</a> */}
                    <Link to={`/`}>
                        <p className="navbar-brand" aria-current="page" >File System by Naumchik</p>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link to={`/documents`}>
                                    <p className="nav-link active" aria-current="page" >Documnets</p>
                                </Link>
                            </li>

                            <li className="nav-item d-flex">
                                <Link to={`/login`}>
                                    <a className="nav-link" href="#">Login</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    //     <div className="container">
    //     <div className="topnav">
    //         <div>
    //             <Link className="active" to={`/cars`}>Main</Link>
    //             <Link to={`/about`}>About</Link>
    //         </div>
    //         {
    //             user === ''
    //                 ?
    //                 <div className='registration'>
    //                     <Link to={'/login'}>Login</Link>
    //                     <Link to={`/register`}>Register</Link>
    //                 </div>
    //                 :
    //                 <div>
    //                     <Link className='active' aria-controls="simple-menu" aria-haspopup="true"onClick={handleClick}>
    //                         Hi, {user}
    //                     </Link>
    //                     <Menu
    //                         id="simple-menu"
    //                         anchorEl={anchorEl}
    //                         keepMounted
    //                         open={Boolean(anchorEl)}
    //                         onClose={handleClose}
    //                     >
    //                         <MenuItem onClick={() => {
    //                             search()
    //                             handleClose()
    //                         }
    //                         }>My ads</MenuItem>
    //                         <MenuItem>
    //                             <Link style={{color: 'black'}} to={'/create'}>
    //                                 Create
    //                             </Link>
    //                         </MenuItem>
    //                         <MenuItem onClick={() => {
    //                             setUser('')
    //                             localStorage.setItem("userName", '')
    //                             handleClose()
    //                         }}>Logout</MenuItem>
    //                     </Menu>
    //                 </div>
    //         }

    //     </div>
    // </div>
    )
}
