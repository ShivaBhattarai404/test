import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

import { IoAddCircleOutline, IoHomeSharp } from "react-icons/io5";
import { IoMdCalculator } from "react-icons/io";

const MainNavigation = () => {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const logoutHandler = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    navigate("/login");
  }
  const logoutBtnClickHandler = (e) =>{
    setModal(true)
  }
  return (
    <nav className={classes.nav}>
      {modal && (
        <Modal title="Confirmation" confirmText="Logout" onConfirm={logoutHandler} onCancel={setModal.bind(null, null)} >
          <h1>Do you want to logout?</h1>
        </Modal>
      )}
      <header className={classes.nav__header}>
        <h1>
          <IoMdCalculator />
          <span>Expense Tracker App</span>
        </h1>
        <div className={classes.userBox}>
          <div className={classes.userBox__username}>Welcome! {username}</div>
          <Button className={classes.logoutBtn} onClick={logoutBtnClickHandler}>Logout</Button>
        </div>
      </header>
      <ul className={classes.nav__ul}>
        <li>
          <NavLink to="/">
            <IoHomeSharp />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/new">
            <IoAddCircleOutline />
            <span>Add a Label</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
