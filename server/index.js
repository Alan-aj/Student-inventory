import express from "express";
import cors from "cors";
import { Login, Student } from "./db/models.js";
import mongoose from "mongoose";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const PORT = process.env.PORT || 9000;

app.post("/login", (req, res) => {
    const { email, password } = req.body
    Login.findOne({ email: email }, (err, data) => {
        if (data) {
            if (password === data.password) {
                res.send({ message: "Login successfull", user: data })
            } else {
                res.send({ message: "Wrong password" })
            }
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

app.post("/register", (req, res) => {
    // console.log(req.body)
    const { username, email, password } = req.body
    Login.findOne({ email: email }, (err, data) => {
        if (data) {
            res.send({ message: "User already registered" })
        } else {
            const user = new Login({
                username,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send({ message: "Registration failed" })
                } else {
                    res.send({ message: "Successfully registered, please login now" })
                }
            })
        }
    })
})

app.post("/add", (req, res) => {
    const { name, phone, email, hobbies, loginid } = req.body
    Student.findOne({ name: name }, (err, data) => {
        if (data) {
            res.send({ message: "Student already exits" })
        } else {
            const student = new Student({
                name,
                phone,
                email,
                hobbies,
                loginid: mongoose.Types.ObjectId(loginid)
            })
            student.save(err => {
                if (err) {
                    res.send({ message: "Failed to add" })
                    console.log(err)
                } else {
                    res.send({ message: "Student added successfully" })
                }
            })
        }
    })
})

app.post("/student", (req, res) => {
    const { loginid } = req.body
    // console.log(loginid)
    if (loginid) {
        Student.find({ loginid: loginid }, function (err, data) {
            if (data) {
                res.send(data)
            } else {
                console.log(err)
            }
        })
    }
})

app.post("/studentOne", (req, res) => {
    const { id } = req.body
    // console.log(req.body)
    if (id) {
        Student.findOne({ _id: id }, function (err, docs) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(docs)
            }
        })
    }

})

app.post("/update", (req, res) => {
    const { name, phone, email, hobbies } = req.body.data
    const { id } = req.body
    Student.findByIdAndUpdate(id, { name: name, phone: phone, email: email, hobbies: hobbies },
        function (err, docs) {
            if (docs) {
                res.send({ message: "Student updated" })
            }
            else {
                res.send({ message: "Update failed" })
                console.log(err)
            }
        });
})

app.post("/delete", (req, res) => {
    const { id } = req.body
    Student.deleteOne({ _id: id })
        .then(function () {
            res.send({ message: "Student deleted" })
        }).catch(function (error) {
            console.log(error);
        })
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})