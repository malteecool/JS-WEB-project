import React from "react";
import Games from "./games";
import Streams from "./streams";
import ReactDOM from "react-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";


function App(){
  return (
    <div className="App container-fluid">
      <Streams/>
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'));