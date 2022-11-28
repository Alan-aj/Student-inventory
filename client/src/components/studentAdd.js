import { Modal } from "react-bootstrap";
import { useState } from "react";
import { URL } from "./data";
import axios from "axios";
import { toast } from 'react-toastify';

function Add(props) {
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        hobbies: ""
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
        data.loginid = props.loginid
        // console.log(data)
        const { name, phone, email, hobbies, loginid } = data
        if (name && phone && email && hobbies && loginid) {
            axios.post(`${URL}/add`, data)
                .then(res => {
                    toast(res.data.message)
                    clearData()
                    props.onHide()
                })
        } else {
            toast.error("Invalid input")
        }
    }

    const clearData = () => {
        setData({
            name: "",
            phone: "",
            email: "",
            hobbies: ""
        })
    }

    return (
        <Modal
            {...props}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="modal-form" onSubmit={dataSubmit}>
                    <div className="modal-input">
                        <label>Name</label>
                        <input type="text" name="name" value={data.name} onChange={handleChange} required />
                    </div>
                    <div className="modal-input">
                        <label>Phone</label>
                        <input type="tel" name="phone" value={data.phone} onChange={handleChange} pattern="[6789][0-9]{9}" title="Eg: 9876543210" required />
                    </div>
                    <div className="modal-input">
                        <label>Email</label>
                        <input type="email" name="email" value={data.email} onChange={handleChange} required />
                    </div>
                    <div className="modal-input">
                        <label>Hobbies</label>
                        <input type="text" name="hobbies" value={data.hobbies} onChange={handleChange} required />
                    </div>
                    <div className="modal-submit">
                        <input type="submit" value="Save" className="modal-bt" />
                        <input type="button" value="Clear" className="modal-bt" onClick={clearData} />
                    </div>
                </form>
            </Modal.Body>
            
        </Modal>
    )
}

export default Add;