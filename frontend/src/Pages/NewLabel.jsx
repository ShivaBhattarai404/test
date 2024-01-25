import { json, redirect, useActionData, useRouteLoaderData } from "react-router-dom";

import { API_BASE_URL } from "../config";
import AddLabel from "../Components/Label/AddLabel/AddLabel";

const NewLabel = () => {
  const data = useRouteLoaderData("editLabel");
  const errors = useActionData();
  return (
    <AddLabel
      id={data?.label._id}
      name={data?.label.name}
      budget={data?.label.budget}
      error={errors}
    />
  );
};

export const loader = async ({ params, request: req }) => {
  if (!params) {
    return json(null);
  }
  const labelId = params.labelId;
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login")
  }
  try {
    const reponse = await fetch(`${API_BASE_URL}/label/${labelId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await reponse.json();
    return json({ label: data.label });
  } catch (error) {
    throw json({}, { status: error.status, statusText: error.message });
  }
};
export const action = async ({ params, request }) => {
  const labelId = params.labelId;
  const formData = await request.formData();
  const name = formData.get("labelName");
  const budget = formData.get("labelBudget");
  const token = localStorage.getItem("token");

  if (!token) {
    return redirect("/login");
  }
  try {
    const response = await fetch(`${API_BASE_URL}/label`, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        labelId: labelId,
        name,
        budget,
      }),
    });
    if (response.status === 400 || response.status === 401) {
      return redirect("/login");
    }
    if (response.status === 422) {
      const errData = await response.json();
      return json({message: "Invalid data", data: errData.data });
    }
    if (!response.ok) {
      return json({message: "Server Error", data: [] });
    }
    return redirect("/");
  } catch (error) {
    throw json({}, { status: error.status, statusText: error.message });
  }
};

export default NewLabel;
