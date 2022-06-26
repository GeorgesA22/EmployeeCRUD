import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function Registration() {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    //Register api where user create new account with usernaem and password
    const register = () => {
        Axios.post("http://localhost:3001/register", {
            username: usernameReg, //Set username
            password: passwordReg, //Set password
        }).then((response) => {
            console.log(response);
        });
    };

    //Login api where the given username and password given by the user are checked in the database
    const login = () => {
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].username);
            }
        });
    };

    /*/Get login api where we get the login status of a user
    useEffect(() => {
      Axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn == true) {
          setLoginStatus(response.data.user[0].username);
        }
      });
    }, []);*/

    //The user can either fill information and register or login with previour registered information
    return ( <
        div className = "App" >
        <
        div className = "registration" >
        <
        h1 > Registration < /h1> <
        label > Username < /label> <
        input type = "text"
        onChange = {
            (e) => {
                setUsernameReg(e.target.value);
            }
        }
        /> <
        label > Password < /label> <
        input type = "text"
        onChange = {
            (e) => {
                setPasswordReg(e.target.value);
            }
        }
        /> <
        button onClick = { register } > Register < /button> <
        /div>

        <
        div className = "login" >
        <
        h1 > Login < /h1> <
        input type = "text"
        placeholder = "Username..."
        onChange = {
            (e) => {
                setUsername(e.target.value);
            }
        }
        /> <
        input type = "password"
        placeholder = "Password..."
        onChange = {
            (e) => {
                setPassword(e.target.value);
            }
        }
        /> <
        button onClick = { login } > Login < /button> <
        /div>

        <
        h1 > { loginStatus } < /h1> <
        /div>
    );
}