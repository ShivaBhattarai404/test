import React, { useContext } from "react";
import LoginComponent from "../Components/Login/Login";
import { json, useActionData, useNavigate } from "react-router-dom";
import authContext from "../store/authContext";

const Login = () => {
  const navigate = useNavigate();
  const ctx = useContext(authContext);
  const data = useActionData();

  if(data && data.token){
    ctx.setToken(data.token);
    navigate("/");
  }
  return <LoginComponent />;
};

export const action = async ({ params, request: req }) => {
  const formData = await req.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if(!response.ok){
    throw json(response);
  }
  const data = await response.json();
  return json({token: data.token});
};

export default Login;
