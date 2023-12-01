import React, { useState } from "react";
import axios from "axios";
import {setCookie} from "../Assets/coockie"
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "exch365",
    password: "",
  });
  //on submit save data to cookies
  const handleSubmit = async() => {

    try {
      // Make an HTTP request using Axios
      const response = await axios.post('https://scorenodeapi.cloudd.live/signin', {
      userName:data.username,
        password:data.password,
      });

      if(response?.data?.success){

        // Handle the response, e.g., store user data in state or localStorage
        const { token, userName } = response?.data?.result;
        
        // Save the token in a cookie
        console.log('Login successful', userName);
        setCookie('authToken', token);
        navigate("/home");
      }

    } catch (error) {
      // Handle login error
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <div className="login-container">
      

      <div className="conteiner">
        <div className="form">
          <input
            type="text"
            placeholder="username"
            onChange={(e) =>
              setData({
                ...data,
                username: e.target.value,
              })
            }
            value={data.username}
          />
          <input
           onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password} type="password" placeholder="Password" />
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
