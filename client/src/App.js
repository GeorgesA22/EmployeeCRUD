import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Auth";

function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route path = "/"
        element = { < Auth authRoute = "register" / > }
        /> <
        Route path = "/registration"
        element = { < Auth authRoute = "register" / > }
        /> <
        Route path = "/main"
        element = { < Auth authRoute = "main" / > }
        />      <
        /Routes> <
        /Router>
    );
}

export default App;