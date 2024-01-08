import React from "react";
import { json, useLoaderData } from "react-router-dom";

import LabelComponent from "../Components/Label/Label";

const Label = () => {
  const data = useLoaderData();
  return (
    <LabelComponent
      expenses={data.expenses}
      label={data.label}
    />
  );
};

export const loader = async ({ params }) => {
  const labelId = params.labelId;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:8080/expenses/" + labelId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 422
    ) {
      throw json({}, { status: 400, statusText: "Invalid token" });
    }
    if (response.status === 404) {
      throw json(
        {},
        { status: 404, statusText: "this api endpoint doesnot exits" }
      );
    }
    if (!response.ok) {
      const errMessage = await response.json().message;
      throw json({}, { status: response.status, statusText: errMessage });
    }
    const data = await response.json();
    return json({
      label: data.label,
      expenses: data.expenses,
    });
  } catch (error) {
    throw json(
      {
        message:
          error.message ||
          error.statusText ||
          "default error from catch block of expenses loader",
      },
      { status: error.status }
    );
  }
};

export const action = async ({ params, request: req }) => {
  const formData = await req.formData();
  const name = formData.get("name");
  const amount = formData.get("amount");
  const token = localStorage.getItem("token");
  const labelId = params.labelId;

  try {
    const response = await fetch("http://localhost:8080/expense", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ labelId, name, amount }),
    });
    if (response.status === 401 || response.status === 400) {
      throw json(
        {},
        { status: response.status, statusText: "Invalid Token or LabelId" }
      );
    }
    if (!response.ok) {
      throw json(
        {},
        { status: response.status, statusText: "Error response from server" }
      );
    }
    await response.json();
    return null;
  } catch (error) {
    throw json(
      {
        message:
          error.message ||
          error.statusText ||
          "default error from catch block of expenses action",
      },
      { status: error.status }
    );
  }
};

export default Label;
