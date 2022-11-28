import { Modal } from "react-bootstrap";
import { useState } from "react";
import { URL } from "./data";
import axios from "axios";
import { toast } from 'react-toastify';
import React from "react"

function Update(props) {
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        hobbies: ""
    })
    const id = props.id
    const counts = props.count

    React.useEffect(() => {
        console.log("test", id)
        clearData()
        if (id) {
            axios.post(`${URL}/studentOne`, { id: id }).then((response) => {
                // console.log(response.data)
                if (response.data) {
                    setData({ name: response.data.name, phone: response.data.phone, email: response.data.email, hobbies: response.data.hobbies })
                }
            });
        }
    }, [counts, id]);

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
        const { name, phone, email, hobbies } = data
        if (name && phone && email && hobbies) {
            axios.post(`${URL}/update`, { data: data, id: id })
                .then(res => {
                    toast(res.data.message)
                    props.onHide()
                    clearData()
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
                    Update data
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
                    <div className="modal-submit" >
                        <input type="submit" value="Update" className="modal-bt" />
                    </div>
                </form>
            </Modal.Body>

        </Modal>
    )
}

export default Update;