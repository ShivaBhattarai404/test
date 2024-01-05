import React, { Fragment } from "react";
import { Outlet, redirect } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation/MainNavigation";

const Root = () => {
  return (
    <Fragment>
      <main>
        <MainNavigation />
        <div style={{ margin: "70px 0 0 20rem" }}>
          <Outlet />
        </div>
      </main>
    </Fragment>
  );
};
 
export const loader = async () =>{
    const currentDate = new Date();
    const expiryDate = new Date(localStorage.getItem("expiryDate"));
    const token = localStorage.getItem("token");

    if(!token || !expiryDate || currentDate >= expiryDate){
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate")
      return redirect("/login")
    }
    return null;
}
export default Root;
