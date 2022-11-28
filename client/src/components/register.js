import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { URL } from "./data";

function Register(){
    const navigate = useNavigate();

    const [data, setData] = React.useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const dataSubmit = (e) => {
        e.preventDefault();
        // console.log(data)
        const { username, email, password } = data
        if (username && email && password) {
            axios.post(`${URL}/register`, data)
                .then(res => {
                    toast(res.data.message)
                    navigate("/login")
                })
        } else {
            toast.error("Invalid input")
        }
    }

    return(
        <div className="logindiv">
            <div className="loginf">
                <h2>Teacher Register</h2>
                <form className="modal-form loginform" onSubmit={dataSubmit}>
                    <div className="modal-input">
                        <label>Username</label>
                        <input type="text" name="username" value={data.username} onChange={handleChange} required />
                    </div>
                    <div className="modal-input">
                        <label>Email</label>
                        <input type="email" name="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div className="modal-input">
                        <label>Password</label>
                        <input type="password" name="password" value={data.password} onChange={handleChange} required />
                    </div>
                    <div className="modal-submit">
                        <input type="submit" value="Register" className="modal-bt" />
                    </div>
                </form>
                <div className="logina">or <a href="/login">Login</a></div>
            </div>
        </div>
    )
}

export default Register;