import { json, redirect } from "react-router-dom";
import AddLabel from "../Components/Label/AddLabel/AddLabel";

const NewLabel = () => {
  return <AddLabel />;
};

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const name = formData.get("labelName");
  const budget = formData.get("labelBudget");
  const token = localStorage.getItem("token");
  if (!token) {
    throw json({}, { status: 422, statusText: "Invalid token" });
  }
  try {
    const response = await fetch("http://localhost:8080/label", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name,
        budget,
      }),
    });
    if (response.status === 400 || response.status === 401) {
      throw json({}, { status: response.status, statusText: "UnAuthorized" });
    }
    if (response.status === 403) {
      // const resData = await response.json();
      throw new Error("Validation error")
    }
    if(!response.ok){
      throw json({}, {status: response.status, statusText: "Unable to add new label"})
    }
    return redirect("/")
  } catch (error) {
    throw json({}, { status: error.status, statusText: error.message });
  }
};

export default NewLabel;
