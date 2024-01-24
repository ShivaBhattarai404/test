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
      <label htmlFor={props.name}>
        {props.title || "Input"}
        {props.required === "true" ? (
          <span className={classes.input__required}> *</span>
        ) : (
          ""
        )}
        {props.invalidText && (
          <span className={classes.invalidText}> ({props.invalidText})</span>
        )}
      </label>
      <input
        className={props.invalid === true ? classes.invalid : ""}
        id={props.name}
        type={props.type || "text"}
        name={props.name}
        step={props.step}
        value={props.value || ""}
        onChange={props.onChange}
        onBlur={props.onBlur}
        autoComplete={props.autoComplete || "on"}
      />
    </div>
  );
};

export default Input;
