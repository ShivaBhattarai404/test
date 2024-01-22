import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

import { IoHomeSharp } from "react-icons/io5";
import { AiFillFileAdd } from "react-icons/ai";
import { IoMdCalculator, IoMdLogOut } from "react-icons/io";
import { MdOutlineExpandCircleDown } from "react-icons/md";

function formatText(text) {
  return text[0].toUpperCase() + text.slice(1);
}

const MainNavigation = () => {
  const [logoutModal, setLogoutModal] = useState(null);
  const [expandNav, setExpandNav] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    navigate("/login");
  };
  const logoutBtnClickHandler = (e) => {
    setLogoutModal(true);
  };
  return (
    <nav className={classes.nav}>
      {logoutModal && (
        <Modal
          title="Confirmation"
          confirmText="Logout"
          onConfirm={logoutHandler}
          onCancel={setLogoutModal.bind(null, null)}
        >
          <h1>Do you want to logout?</h1>
        </Modal>
      )}
      <header className={classes.nav__header}>
        <div className={`${classes.nav__header__menuBtn} ${expandNav ? classes.clicked : ""}`} onClick={()=>{setExpandNav(prevState => !prevState)}}>
          <MdOutlineExpandCircleDown />
        </div>
        <h1>
          <IoMdCalculator />
          <span>Expense Tracker App</span>
        </h1>
        <div className={classes.userBox}>
          <div className={classes.userBox__username}>
            Welcome! {formatText(username)}
          </div>
          <Button className={classes.logoutBtn} onClick={logoutBtnClickHandler}>
            Logout
          </Button>
        </div>
      </header>
      <ul className={`${classes.nav__ul} ${expandNav ? classes.clicked : ""}`}>
        <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : "")}>
          <li>
            <a href="/">
              <IoHomeSharp />
              <span>Home</span>
            </a>
          </li>
        </NavLink>

        <NavLink to="/new" className={({ isActive }) => (isActive ? classes.active : "")}>
          <li>
            <a href="/new">
              <AiFillFileAdd />
              <span>Add a Label</span>
            </a>
          </li>
        </NavLink>

        <li>
        <NavLink className={classes.nav__ul__logoutBtn} onClick={logoutBtnClickHandler}>
              <IoMdLogOut />
              <span>Logout</span>
        </NavLink>
          </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
