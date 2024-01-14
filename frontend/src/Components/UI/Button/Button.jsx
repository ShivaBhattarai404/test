import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const { variant } = props;
  let classnames = "";
  switch (variant) {
    case "success":
      classnames = classes.success;
      break;
    case "danger":
      classnames = classes.danger;
      break;
    case "peace":
      classnames = classes.peace;
      break;
    case "form":
      classnames = classes.form;
      break;
    default:
      classnames = "";
  }
  return (
    <button
      className={`${classes.btn} ${props.className ? props.className : ""} ${
        props.animated ==="true" && classes.animated
      } ${classnames} ${props.disabled ? classes.disabled : ""}`}
      style={{ ...props.style }}
      onClick={props.onClick}
      disabled={props.disabled || false}
    >
      {props.children}
    </button>
  );
};

export default Button;
