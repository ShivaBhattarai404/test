import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${classes.card} ${props.className ? props.className : ""}`}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
