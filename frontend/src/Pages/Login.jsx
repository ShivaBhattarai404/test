import React from "react";
import LoginComponent from "../Components/Login/Login";
import { json, redirect } from "react-router-dom";

const Login = () => {
  return <LoginComponent />;
};

export const action = async ({ params, request: req }) => {
  try {
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
    if(response.status === 401 || response.status === 422){
      throw json({message: "Not Authorized"}, {status: response.status});
    }
    const data = await response.json();
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    const expiryDate = new Date();
    expiryDate.setHours(new Date().getHours() + 1);
    localStorage.setItem("expiryDate", expiryDate.toISOString());

    return redirect("/");
  } catch (error) {
    throw error;
  }
};

export default Login;
