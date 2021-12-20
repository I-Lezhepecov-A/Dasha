import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import {Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import Cars from './Cars'
// import Item from "../components/Item/Item";
// import OldCars from "./OldCars";
// import NewCars from "./NewCars";
// import Register from "./Register/Register";
// import About from './About'
// import Login from "./Login/Login";
// import Create from './Create/Create'
// import Test from "./Test";
import Header from "./components/Heder";
import Documents from "./components/Documents";
import Document from "./components/Document"
import {getData, getParams} from "./api/index";
import Login from './components/Login'
import CreateComment from './components/CreateComment';
import CreateDocumnet from './components/CreateDocument';


export default function App() {
    const [card, setCard] = useState([])
    const [documents, setDocuments] = useState([])
    const [params, setParams] = useState({})
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState()



    useEffect(() => {
        setUser(localStorage.getItem("userName"))
    }, [])


    return (
        <div>
            {/* {/* <Router> */}
           
            
            <Router>

            {/* <Header setCard={setCard} userId={userId} setUserId={setUserId} user={user} setUser={setUser}/> */}
            <Header setCard={setCard} userId={userId} setUserId={setUserId} user={user} setUser={setUser}/>
                <Switch>
                    <Route exact path="/documents">
                      <Documents params={params} documents={documents} setDocuments={setDocuments}/>
                    </Route>
                    <Route exact path="/documents/:id" component={Document}/>
                    {/* <Route  exact path="/login" component={Login}/> */}
                    <Route exact path="/login">
                        <Login setUserId={setUserId} setUser={setUser} />
                    </Route>
                    <Route path='/add_document' component={CreateDocumnet}/>
                    {/* <Route exact path="cars/:id" render={(props)=>
                        <Item id={'cars/:id'.slice(6)}/>}
                    />
                    <Route exact path="/cars/:id" component={Item}/>
                    <Route path='/about' component={About}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login">
                        <Login setUserId={setUserId} setUser={setUser} />
                    </Route>
                    <Route exact path="/create" component={Create}/>
                    <Route exact path="/test" component={Test}/> */}
                </Switch>
            </Router>
        </div>
)
}