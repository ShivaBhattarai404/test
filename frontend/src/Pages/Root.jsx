import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation/MainNavigation";

const Root = () => {
  return (
    <main>
      <MainNavigation />
      <div style={{margin: "70px 0 0 20rem"}}>
        <Outlet />
      </div>
    </main>
  );
};

export default Root;
