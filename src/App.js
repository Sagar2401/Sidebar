import React, { useEffect } from "react";
import "./App.css";
import {  Routes, Route, useNavigate,  } from "react-router-dom";
import Overview from "./pages/Overview";
import { data } from "./components/SidebarData";
import { Login } from "./pages/Login";
import { getCookie } from "./Assets/coockie";

function App() {
const navigate = useNavigate()
  const token = getCookie('authToken')

useEffect(() => {
 if (token){
  navigate("/home")
 }else(
  navigate("/")

 )
}, [])


  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      
            <Route path="/home" element={<Overview />} />
            {data.map((item) => {
              if (item.webPage) {
                return (
                  <Route
                    path={item.webPage.toLocaleLowerCase()}
                    element={<Overview />}
                  />
                );
              } else return null;
            })}
        </Routes>
    </div>
  );
}

export default App;
