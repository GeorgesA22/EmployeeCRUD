const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

//Database connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Grg22@z!",
    database: "employeedb",
});

//Create api where employee information are set when adding new employee
app.post("/create", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    //Adding the employee information to the database
    db.query(
        "INSERT INTO employee (name, age, country, position, wage) VALUES (?,?,?,?,?)", [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

//Get all the employees from the database
app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Update api where we apdate employee wage by his unique id
app.put("/update", (req, res) => {
    //reading id and wage from user
    const id = req.body.id;
    const wage = req.body.wage;

    //Updating wage in databse
    db.query(
        "UPDATE employee SET wage = ? WHERE id = ?", [wage, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//Delete api where an employee is deleted by its unique id
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Running on port 3001");
});