import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div
      className={`${classes.inputWrapper} ${
        props.className ? props.className : ""
      }`}
      style={{ ...props.style }}
    >
      <label htmlFor={props.name}>{props.title || "Input"}{props.required==="true" ? <span className={classes.input__required}> *</span> : ""}</label>
      <input id={props.name} type={props.type || "text"} name={props.name} step={props.step} />
    </div>
  );
};

export default Input;
