import React from "react";
import { Outlet, redirect } from "react-router-dom";
import RootWrapper from "../Components/Root/Wrapper";

const Root = () => {
  return (
    <RootWrapper>
      <Outlet />
    </RootWrapper>
  );
};

export const loader = async () => {
  const currentDate = new Date();
  const expiryDate = new Date(localStorage.getItem("expiryDate"));
  const token = localStorage.getItem("token");

  if (!token || !expiryDate || currentDate >= expiryDate) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    return redirect("/login");
  }
  return null;
};
export default Root;
