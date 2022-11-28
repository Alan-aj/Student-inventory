import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";
import "./App.css"

function App() {
  const [loginId,setLoginid] = React.useState("1")
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={loginId ? <Home setLoginid={setLoginid} /> : <Login setLoginid={setLoginid} />} />
        <Route path='/login' element={<Login setLoginid={setLoginid} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
