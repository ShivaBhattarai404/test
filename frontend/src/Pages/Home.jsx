import React from "react";
import { json, useLoaderData } from "react-router-dom";

import { API_BASE_URL } from "../config";
import HomeComponent from "../Components/Home/Home";

const Home = () => {
  const data = useLoaderData();
  const labels = (data && data.labels) ? data.labels : [];
  return <HomeComponent labels={labels} />;
};

export const loader = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/labels`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
    });
    if (response.status === 401 || response.status === 422) {
      throw json({},{ status: 401, statusText:  "You are not authenticated"});
    }
    if (response.status === 404) {
      return json({labels: []});
    }
    const data = await response.json();
    return json({ labels: data.labels });
  } catch (error) {
    throw json({message: error.statusText || "Some Error Occured"}, {status: error.status || 502});
  }
};
export default Home;
