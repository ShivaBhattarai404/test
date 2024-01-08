import React from "react";
import classes from "./AddLabel.module.css";
import { Form } from "react-router-dom";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const AddLabel = ({id, name, budget}) => {
  let formAction = "/new"
  if(id){
    formAction = "/new/"+id
  }
  return (
    <section className={classes.section}>
      <h1 className={classes.title}>Add New Label</h1>
      <Form className={classes.form} method={id? "PATCH" : "PUT"} action={formAction}>
        <Input
          className={classes.formLabelName}
          name="labelName"
          title="Label Name"
          required="true"
          value={name}
        />
        <Input
          title="Budget"
          required="true"
          name="labelBudget"
          type="number"
          step="0.1"
          value={budget}
        />
        <Button variant="success" type="submit" className={classes.saveBtn}>
          {id ? "Update" : "Save"}
        </Button>
      </Form>
    </section>
  );
};

export default AddLabel;
