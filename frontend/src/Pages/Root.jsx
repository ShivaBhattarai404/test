import React, { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation/MainNavigation";
import authContext from "../store/authContext";

const Root = () => {
  const [logStatus, setLogStatus] = useState(false);
  const ctx = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDate = new Date();
    const expiryDate = new Date(localStorage.getItem("expiryDate"));
    const token = localStorage.getItem("token");

    if(!token || currentDate >= expiryDate){
      navigate("/login");
      ctx.isLoggedIn = false;
      setLogStatus(false);
    }
    ctx.isLoggedIn = true;
    setLogStatus(true);
  }, [ctx, navigate]);

  return (
    <Fragment>
      {logStatus && <main>
      <MainNavigation />
      <div style={{ margin: "70px 0 0 20rem" }}>
        <Outlet />
      </div>
    </main>}
    </Fragment>
  );
};

export default Root;
