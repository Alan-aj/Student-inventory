import express from "express";
import cors from "cors";
import { Student } from "./db/models.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

const PORT = process.env.PORT || 9000;

app.post("/add", (req, res) => {
    const { name } = req.body
    const createData = req.body
    Student.findOne({ name: name }, (err, data) => {
        if (data) {
            res.send({ message: "Student already exits" })
        } else {
            const student = new Student(createData)
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

app.get("/student", (req, res) => {
    Student.find({}, function (err, data) {
        if (data) {
            res.send(data)
        } else {
            console.log(err)
        }
    })
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

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})