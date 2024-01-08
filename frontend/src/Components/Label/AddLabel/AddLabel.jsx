import React, { useState } from "react";
import classes from "./AddLabel.module.css";
import { Form } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";

const AddLabel = () => {
  return (
    <section className={classes.section}>
      <h1 className={classes.title}>Add New Label</h1>
      <Form className={classes.form} method="POST" action="/new">
        <Input
          className={classes.formLabelName}
          name="labelName"
          title="Label Name"
          required="true"
        />
        <Input
          title="Budget"
          required="true"
          name="labelBudget"
          type="number"
          step="0.1"
        />
        <Button variant="success" type="submit" className={classes.saveBtn}>
          Save
        </Button>
      </Form>
    </section>
  );
};

export default AddLabel;
