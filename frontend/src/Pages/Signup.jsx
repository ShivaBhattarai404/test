import React from "react";
import { json, redirect, useActionData } from "react-router-dom";

import Login from "../Components/Login/Login";
import { API_BASE_URL } from "../config";

const Signup = () => {
  const errors = useActionData();
  return <Login mode="signup" error={errors} />;
};

export const action = async ({ params, request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
    if(response.status === 422){
      const errData = await response.json();
      return json({message: "Invalid Credientials", data: errData.data});
    }
    if(!response.ok){
      return json(({message: "Account Creation failed"}));
    }
    return redirect("/login");
  } catch (error) {
    return json(({message: "Account Creation failed"}));
  }
};

export default Signup;
