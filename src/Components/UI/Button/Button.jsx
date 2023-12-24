import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
    const {variant} = props;
    let classnames = "";
   switch(variant){
    case "success":
        classnames = classes.success;
        break;
    case "danger":
        classnames = classnames.danger;
        break;
    default:
        classnames = "";
   }
  return (
    <button
      className={`${classes.btn} ${props.className ? props.className : ""} ${classnames}`}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
