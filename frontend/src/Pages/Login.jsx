import React from "react";
import LoginComponent from "../Components/Login/Login";
import { json, redirect, useActionData } from "react-router-dom";

const Login = () => {
  const errorData = useActionData()
  return <LoginComponent error={errorData} />;
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
    if(response.status === 401){
      return json({message: "Incorrect email or password", status: 401})
    }
    if(response.status === 422){
      const data = await response.json();
      return json({message: "Invalid Credientials", status: 422, data: data.data});
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
