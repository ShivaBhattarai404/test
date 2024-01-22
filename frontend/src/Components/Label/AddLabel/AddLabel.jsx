import React, { useEffect, useReducer, useState } from "react";
import classes from "./AddLabel.module.css";
import { Form } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";

const initialState = {
  name: {
    value: "",
    invalidText: null,
    touched: false,
  },
  budget: {
    value: 0,
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
    case "budget":
      invalidText = payload<=0
        ? "Budget should be greater than zero"
        : null;
      return {
        ...state,
        budget: { value: +payload, invalidText, touched: true },
      };
    default:
      throw new Error("Invalid action type from switch case of login.jsx");
  }
};

const AddLabel = ({ id, name, budget, error }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({ message: "", data: [] });
  useEffect(() => {
    if (name && budget) {
      dispatch({ type: "name", payload: name });
      dispatch({ type: "budget", payload: budget });
    }
    if (error) {
      setErrors({ message: error.message, data: error.data || [] });
    }
  }, [error, name, budget]);

  const isFormValid =
    !state.name.invalidText &&
    state.name.touched &&
    !state.budget.invalidText &&
    state.budget.touched;

  let formAction = "/new";
  if (id) {
    formAction = "/new/" + id;
  }

  return (
    <section className={classes.section}>
      {errors.message && (
        <Modal
          title="Label Creation Failed!!"
          confirmText="Okay"
          onConfirm={() => setErrors({ message: "", data: [] })}
          onCancel={() => setErrors({ message: "", data: [] })}
        >
          <h2>{error.message}</h2>
          <br />
          {errors.data.map((msg, index) => (
            <h3 key={msg}>
              {index + 1}. {msg}
            </h3>
          ))}
        </Modal>
      )}

      <h1 className={classes.title}>Add New Label</h1>
      <Form
        className={classes.form}
        method={id ? "PATCH" : "PUT"}
        action={formAction}
      >
        <Input
          className={classes.form__input}
          name="labelName"
          title="Label Name"
          required="true"
          value={state.name.value}
          invalid={state.name.invalidText && state.name.touched}
          invalidText={state.name.invalidText}
          onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
          onBlur={(e) => dispatch({ type: "name", payload: e.target.value })}
        />
        <Input
          className={classes.form__input}
          title="Budget"
          required="true"
          name="labelBudget"
          type="number"
          step="0.1"
          invalid={state.budget.invalidText && state.budget.touched}
          invalidText={state.budget.invalidText}
          value={state.budget.value}
          onChange={(e) =>
            dispatch({ type: "budget", payload: e.target.value })
          }
          onBlur={(e) => dispatch({ type: "budget", payload: e.target.value })}
        />
        <Button variant="form" type="submit" className={classes.saveBtn} disabled={!isFormValid}>
          {id ? "Update" : "Save"}
        </Button>
      </Form>
    </section>
  );
};

export default AddLabel;
