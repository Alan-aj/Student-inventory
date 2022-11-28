import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: 'config.env' })
const DB = process.env.MONGO_URI

// db connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Db connected")
}).catch((error) => {
    console.log(error.message)
    console.log("Db not connected")
})

const loginSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const studentSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    hobbies: String,
    loginid: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Login' }
    ]
})

// models
export const Login = new mongoose.model("Login", loginSchema)
export const Student = new mongoose.model("Student", studentSchema)