import React from "react"
import axios from "axios"
import { URL } from "./data";
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

function Login(props) {
    const navigate = useNavigate();

    const [data, setData] = React.useState({
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
        const { email, password } = data
        if (email && password) {
            axios.post(`${URL}/login`, data)
                .then(res => {
                    toast(res.data.message)
                    if (res.data.user) {
                        localStorage.setItem("loginId", res.data.user._id)
                        props.setLoginid(res.data.user._id)
                        navigate("/", { replace: true })
                    }
                })
        } else {
            toast.error("Invalid input")
        }
    }

    return (
        <div className="logindiv">
            <div className="loginf">
                <h2>Teacher Login</h2>
                <form className="modal-form loginform" onSubmit={dataSubmit}>
                    <div className="modal-input">
                        <label>Email</label>
                        <input type="email" name="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div className="modal-input">
                        <label>Password</label>
                        <input type="password" name="password" value={data.password} onChange={handleChange} required />
                    </div>
                    <div className="modal-submit">
                        <input type="submit" value="Login" className="modal-bt" />
                    </div>
                </form>
                <div className="logina">or <a href="/register">Register</a></div>
            </div>
        </div>
    )
}

export default Login;