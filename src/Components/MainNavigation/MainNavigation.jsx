import React from "react";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { IoAddCircleOutline, IoHomeSharp } from "react-icons/io5";
import { IoMdCalculator } from "react-icons/io";

const MainNavigation = () => {
  return (
    <nav className={classes.nav}>
      <header className={classes.nav__header}>
      <span><IoMdCalculator /></span>
        <h1>Expense Tracker App</h1>
      </header>
      <ul className={classes.nav__ul}>
        <li>
          <NavLink to="/"><IoHomeSharp /><span>Home</span></NavLink>
        </li>
        <li>
          <NavLink to="/new"><IoAddCircleOutline /><span>Add a Label</span></NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
