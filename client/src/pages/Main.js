import React, { useState } from "react";
import Axios from "axios";
import "../App.css";

export default function Main() {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState(0);

    const [newWage, setNewWage] = useState(0);

    const [employeeList, setEmployeeList] = useState([]);

    //Adding the new employee
    const addEmployee = () => {
        Axios.post("http://localhost:3001/create", {
            name: name, //Set name
            age: age, //Set age
            country: country, //Set country
            position: position, //Set Position
            wage: wage, //Set Wage
        }).then(() => {
            setEmployeeList([ //Print the information given by the user
                ...employeeList,
                {
                    Name: name,
                    Age: age,
                    Country: country,
                    Position: position,
                    Wage: wage,
                },
            ]);
        });
    };

    //Get all the employees saved in the database
    const getEmployees = () => {
        Axios.get("http://localhost:3001/employees").then((response) => {
            setEmployeeList(response.data);
        });
    };

    //Update an employee wage by his unique id
    const updateEmployeeWage = (id) => {
        Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
            (response) => {
                setEmployeeList(
                    employeeList.map((val) => {
                        return val.id == id ? { //Check if the id is valid
                                id: val.id, //if valid update employee information
                                Name: val.Name,
                                Country: val.Country,
                                Age: val.Age,
                                Position: val.Position,
                                Wage: newWage,
                            } :
                            val; //else if not valid, return the employee without changing anything
                    })
                );
            }
        );
    };

    //Delete an employee from the database by its unique id
    const deleteEmployee = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            setEmployeeList(
                employeeList.filter((val) => {
                    return val.id != id;
                })
            );
        });
    };

    //The user can either fill new employee information or click Show Employees to get all saved employees information
    return ( <
        div className = "App" >
        <
        h1 > Employees Application < /h1>

        <
        div className = "information" >
        <
        label > Name: < /label> <
        input type = "text"
        onChange = {
            (event) => {
                setName(event.target.value);
            }
        }
        /> <
        label > Age: < /label> <
        input type = "number"
        onChange = {
            (event) => {
                setAge(event.target.value);
            }
        }
        /> <
        label > Country: < /label> <
        input type = "text"
        onChange = {
            (event) => {
                setCountry(event.target.value);
            }
        }
        /> <
        label > Position: < /label> <
        input type = "text"
        onChange = {
            (event) => {
                setPosition(event.target.value);
            }
        }
        /> <
        label > Wage(year): < /label> <
        input type = "number"
        onChange = {
            (event) => {
                setWage(event.target.value);
            }
        }
        /> <
        button onClick = { addEmployee } > Add Employee < /button> <
        /div> <
        div className = "employees" >
        <
        button onClick = { getEmployees } > Show Employees < /button>

        {
            employeeList.map((val, key) => {
                return ( <
                    div className = "employee" >
                    <
                    div >
                    <
                    h3 > Name: { val.Name } < /h3> <
                    h3 > Age: { val.Age } < /h3> <
                    h3 > Country: { val.Country } < /h3> <
                    h3 > Position: { val.Position } < /h3> <
                    h3 > Wage: { val.Wage } < /h3>   <
                    /div> <
                    div >
                    <
                    input type = "text"
                    placeholder = "Wage..."
                    onChange = {
                        (event) => {
                            setNewWage(event.target.value);
                        }
                    }
                    /> <
                    button onClick = {
                        () => {
                            updateEmployeeWage(val.id);
                        }
                    } > { " " }
                    Update <
                    /button>

                    <
                    button onClick = {
                        () => {
                            deleteEmployee(val.id);
                        }
                    } >
                    Delete <
                    /button> <
                    /div> <
                    /div>
                );
            })
        } <
        /div> <
        /div>
    );
}