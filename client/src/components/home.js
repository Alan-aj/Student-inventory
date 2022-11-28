import React from "react"
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import { URL } from "./data";
import Add from './studentAdd';
import Update from "./studentUpdate";
import {ToastContainer} from "react-toastify"

function Home(props) {
    const [data, setData] = React.useState([]);
    const [modalAdd, setModalAdd] = React.useState(false);
    const [modalUpdate, setModalUpdate] = React.useState(false);
    const [id, setId] = React.useState("")
    const [count, setCount] = React.useState(false)

    React.useEffect(() => {
        axios.get(`${URL}/student`).then((response) => {
            // console.log(response.data)
            setData(response.data);
        });
    }, [modalAdd, modalUpdate]);

    return (
        <div className='body-div'>
            <h1>STUDENT MANAGEMENT SYSTEM</h1>
            <div className='table-div'>
                <div>
                    <Button variant="success" className='bt' onClick={() => setModalAdd(true)}>Add new</Button>
                    <Button variant="primary" className='bt'>Logout</Button>
                </div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Hobbies</th>
                            <th className='table-bt'></th>
                            <th className='table-bt'></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((post, index) => (
                                <tr key={post._id}>
                                    <td>{index + 1}</td>
                                    <td>{post.name}</td>
                                    <td>{post.phone}</td>
                                    <td>{post.email}</td>
                                    <td>{post.hobbies}</td>
                                    <td>
                                        <Button variant="secondary" onClick={() => {
                                            setId(post._id)
                                            setModalUpdate(true)
                                            setCount(!count)
                                        }}>Update</Button>
                                    </td>
                                    <td>
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            </div>
            <Add
                show={modalAdd}
                onHide={() => setModalAdd(false)}
            />
            <Update
                show={modalUpdate}
                onHide={() => setModalUpdate(false)}
                id={id}
                count={count ? 1 : 0}
            />
            <ToastContainer />
        </div>
    )
}

export default Home;