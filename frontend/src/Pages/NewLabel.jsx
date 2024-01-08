import { json, redirect, useRouteLoaderData } from "react-router-dom";
import AddLabel from "../Components/Label/AddLabel/AddLabel";

const NewLabel = () => {
  const data = useRouteLoaderData("editLabel");
  return <AddLabel id={data?.label._id} name={data?.label.name} budget={data?.label.budget} />;
};

export const loader = async ({params, request:req})=>{
  if(!params){
    return json(null);
  }
  const labelId = params.labelId;
  const token = localStorage.getItem("token");
  if(!token){
    throw json({}, {status: "401", statusText: "Invalid Token"})
  }
  try {
    const reponse = await fetch("http://localhost:8080/label/"+labelId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer "+token,
      }
    })
    const data = await reponse.json();
    return json({label: data.label})
  } catch (error) {
    throw json({}, {status: error.status, statusText: error.message})
  }
}
export const action = async ({ params, request }) => {
  const labelId = params.labelId;
  const formData = await request.formData();
  const name = formData.get("labelName");
  const budget = formData.get("labelBudget");
  const token = localStorage.getItem("token");
  
  if (!token) {
    throw json({}, { status: 422, statusText: "Invalid token" });
  }
  try {
    const response = await fetch("http://localhost:8080/label", {
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
      throw json({}, { status: response.status, statusText: "UnAuthorized" });
    }
    if (response.status === 403) {
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
