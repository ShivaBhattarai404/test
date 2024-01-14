import React, { useEffect, useReducer, useState } from "react";
import classes from "./Login.module.css";
import Card from "../UI/Card/Card";
import { Form, Link, useNavigation } from "react-router-dom";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

const initialState = {
  username: {
    value: "",
    invalidText: null,
    touched: false,
  },
  name: {
    value: "",
    invalidText: null,
    touched: false,
  },
  email: {
    value: "",
    invalidText: null,
    touched: false,
  },
  password: {
    value: "",
    invalidText: null,
    touched: false,
  },
  confirmPassword: {
    value: "",
    invalidText: null,
    touched: false,
  },
};
const reducer = (state, { type, payload }) => {
  let invalidText;
  switch (type) {
    case "name":
      invalidText = !payload.length ? "Name can't be empty" : null;
      return { ...state, name: { value: payload, invalidText, touched: true } };
    case "username":
      invalidText = !payload.length ? "Username can't be empty" : null;
      return {
        ...state,
        username: { value: payload, invalidText, touched: true },
      };
    case "email":
      invalidText =
        payload &&
        payload
          .toLowerCase()
          .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
          ? null
          : "Enter a valid email";
      return {
        ...state,
        email: { value: payload, invalidText, touched: true },
      };
    case "password":
      invalidText =
        payload.length < 6 ? "Password should be 6 character long" : null;
      return {
        ...state,
        password: { value: payload, invalidText, touched: true },
      };
    case "confirmPassword":
      invalidText =
        payload === state.password.value
          ? null
          : "Confirm password and password should be same";
      return {
        ...state,
        confirmPassword: { value: payload, invalidText, touched: true },
      };
    default:
      throw new Error("Invalid action type from switch case of login.jsx");
  }
};

const Login = ({ mode, error }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({ message: "", data: [] });
  useEffect(() => {
    if (error) {
      setErrors({ message: error.message, data: error.data || [] });
    }
  }, [error]);

  const isSignUpFormValid =
    !state.name.invalidText &&
    state.name.touched &&
    !state.username.invalidText &&
    state.username.touched &&
    !state.email.invalidText &&
    state.email.touched &&
    !state.password.invalidText &&
    state.password.touched &&
    !state.confirmPassword.invalidText &&
    state.confirmPassword.touched;

  const isLoginFormValid =
    !state.email.invalidText &&
    state.email.touched &&
    !state.password.invalidText &&
    state.password.touched;
  const isFormValid = mode === "signup" ? isSignUpFormValid : isLoginFormValid;

  const submitText = mode === "signup" ? "Create Account" : "Login";
  return (
    <div className={classes.container}>
      {errors.message && (
        <Modal
          title={mode==="signup"? "Account Creation Failed!!" : "Login Failed!!"}
          confirmText="Okay"
          onConfirm={() => setErrors({ message: "", data: [] })}
          onCancel={() => setErrors({ message: "", data: [] })}
        >
          <h2>{error.message}</h2>
          <br />
          {errors.data.map((msg, index) => (
            <h3 key={msg}>{index+1}. {msg}</h3>
          ))}
        </Modal>
      )}

      <Card className={classes.form}>
        <h1 className={classes.title}>
          {mode === "signup" ? "Create new account" : "Login"}
        </h1>
        <Form
          method={mode === "signup" ? "PUT" : "POST"}
          action={mode === "signup" ? "/signup" : "/login"}
          noValidate={true}
        >
          {mode === "signup" && (
            <>
              <Input
                title="Name"
                type="text"
                name="name"
                invalid={state.name.invalidText && state.name.touched}
                invalidText={state.name.invalidText}
                value={state.name.value}
                onChange={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
                onBlur={(e) =>
                  dispatch({ type: "name", payload: e.target.value })
                }
              />
              <Input
                title="Username"
                type="text"
                name="username"
                invalid={state.username.invalidText && state.username.touched}
                invalidText={state.username.invalidText}
                value={state.username.value}
                onChange={(e) =>
                  dispatch({ type: "username", payload: e.target.value })
                }
                onBlur={(e) =>
                  dispatch({ type: "username", payload: e.target.value })
                }
              />
            </>
          )}
          <Input
            title="Email"
            type="email"
            name="email"
            invalid={state.email.invalidText && state.email.touched}
            invalidText={state.email.invalidText}
            value={state.email.value}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            onBlur={(e) => dispatch({ type: "email", payload: e.target.value })}
          />
          <Input
            title="Password"
            type="password"
            name="password"
            invalid={state.password.invalidText && state.password.touched}
            invalidText={state.password.invalidText}
            value={state.password.value}
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            onBlur={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
          />
          {mode === "signup" && (
            <Input
              title="Confirm Password"
              type="password"
              invalid={
                state.confirmPassword.invalidText &&
                state.confirmPassword.touched
              }
              invalidText={state.confirmPassword.invalidText}
              value={state.confirmPassword.value}
              onChange={(e) =>
                dispatch({ type: "confirmPassword", payload: e.target.value })
              }
              onBlur={(e) =>
                dispatch({ type: "confirmPassword", payload: e.target.value })
              }
            />
          )}
          <Button type="submit" disabled={!isFormValid} variant="form">
            {navigation.state === "submitting" ? "Submitting" : submitText}
          </Button>
        </Form>

        <h3 className={classes.signupTxt}>
          {mode === "signup" ? "Already" : "Don't"} have an account?{" "}
          <Link to={mode === "signup" ? "/login" : "/signup"}>
            {mode === "signup" ? "Login" : "Create Free Account"}
          </Link>
        </h3>
      </Card>
    </div>
  );
};

export default Login;
