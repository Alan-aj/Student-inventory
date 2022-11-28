import React from "react"
import { Button, Table } from 'react-bootstrap';
import axios from "axios";
import { URL } from "./data";
import Add from './studentAdd';
import Update from "./studentUpdate";
import { toast } from 'react-toastify';

function Home(props) {
    const [data, setData] = React.useState([]);
    const [modalAdd, setModalAdd] = React.useState(false);
    const [modalUpdate, setModalUpdate] = React.useState(false);
    const [id, setId] = React.useState("")
    const [count, setCount] = React.useState(false)
    const [login, setLogin] = React.useState("")
    const [del, setDel] = React.useState(false)

    React.useEffect(() => {
        const loginid = localStorage.getItem("loginId")
        setLogin(loginid)
        // console.log(login)
        axios.post(`${URL}/student`, {loginid: loginid}).then((response) => {
            // console.log(response.data)
            setData(response.data);
            setDel(false)
        });
    }, [modalAdd, modalUpdate, del]);

    const logOut = () => {
        localStorage.removeItem("loginId")
        // localStorage.clear()
        props.setLoginid(null)
    }

    const deleteStudent = (id)=>{
        axios.post(`${URL}/delete`, { id: id })
        .then(res => {
            toast(res.data.message)
            setDel(true)
        })
    }

    return (
        <div className='body-div'>
            <h1>STUDENT MANAGEMENT SYSTEM</h1>
            <div className='table-div'>
                <div>
                    <Button variant="success" className='bt' onClick={() => setModalAdd(true)}>Add new</Button>
                    <Button variant="primary" className='bt' onClick={logOut}>Logout</Button>
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
                                        <Button variant="danger" onClick={()=>deleteStudent(post._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            </div>
            <Add
                show={modalAdd} loginid={login}
                onHide={() => setModalAdd(false)}
            />
            <Update
                show={modalUpdate}
                onHide={() => setModalUpdate(false)}
                id={id}
                count={count ? 1 : 0}
            />
        </div>
    )
}

export default Home;