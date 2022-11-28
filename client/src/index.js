import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from "react-toastify"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <App />
        <ToastContainer />
    </div>
);
