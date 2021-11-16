import React from "react";
import Games from "./games";
import Streams from "./streams";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProvider from "./UserProvider";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ReactDOM from "react-dom";
import history from "./history";
import Menu from "./menubar";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";


function App(){
  return (
    <div className="App container-fluid">
    <Menu/>
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Streams/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </UserProvider>
    </div>
);
}


ReactDOM.render(<App />,document.getElementById('root'));