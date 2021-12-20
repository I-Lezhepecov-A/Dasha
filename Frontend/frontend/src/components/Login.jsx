import React, {useEffect,useRef, useState} from 'react'
import {Link} from "react-router-dom";
import {getData} from "../api/index";
import Header from "./Heder"; 
import jwt_decode from "jwt-decode"
import {withRouter} from 'react-router-dom';
import {postData ,sendLogInf, getUserInf} from "../api";
import './Login.scss'

const Login = ({ setRole, close, setUser, history, setUserId }) => {
    const [logInf, setLogInf] = useState({
        'username': "",
        'password': ""
    })

    const ref = useRef(null)
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                history.push('/cars')
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, close])

    const changeHandler = (option, value) => {
        const newInf = logInf
        newInf[option] = value
        setLogInf(newInf)
    }


    const submitHandle = async (event) => {
        event.preventDefault()
        const data = await sendLogInf(logInf)
        const token = data.data.access_token
        console.log(token)
        const userInf = jwt_decode(token)
        console.log(userInf)
        // const userData = await getUserInf(userInf[Object.keys(userInf)[3]])

        console.log('0-1-1-1-1-0')
        console.log(userInf)
        console.log('0-1-1-1-1-0')
        localStorage.setItem("id", userInf.user.id)
        setUserId(userInf.user.id)
        localStorage.setItem("userName", userInf.user.username)
        setUser(userInf.user.username)
        history.push('/documents')
    }

    return (
        <div className="modal">
            <div ref={ref} className="modal__container_log">
                <div className="modal_registration_label">
                    Login
                </div>
                <form onSubmit={submitHandle} className="modal_input_data_container">
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("username", event.target.value)} className="modal_registration_input" type="text" required placeholder=" Username" />
                    </div>
                    <div className="modal_input_data_container_element">
                        <input onChange={(event) => changeHandler("password", event.target.value)} className="modal_registration_input" type="password" required placeholder=" Password" />
                    </div>

                    <div className="modal_button">
                        <button className="modal_registration_account_button">Log into</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default withRouter(Login)
