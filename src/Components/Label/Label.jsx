import React from "react";

import { IoAddCircleOutline } from "react-icons/io5";

import classes from "./Label.module.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const Label = (props) => {
  return (
    <section className={classes.section}>
      {/* {props.id} */}
      <h1 className={classes.balance}>YOUR BALANCE IS: Rs 5995/-</h1>
      <Card className={classes.card}>
        <div className={classes.card__title}>Budget</div>
        <div className={classes.card__deposit}>Deposit: Rs 6000/-</div>
      </Card>
      <Card className={classes.card}>
        <div className={classes.card__title}>Expenses</div>
        <div className={classes.card__expenses}>Expenses: Rs 3000/-</div>
      </Card>
      <Button className={classes.addExpenseBtn}>
        <span className={classes.addExpenseBtn__icon}>
          <IoAddCircleOutline />
        </span>
        <span>Add an expense</span>
      </Button>

      <div className={classes.history}>
        <h1 className={classes.history__title}>Transaction Details</h1>
        <div className={classes.history__item}>
          <h1 className={classes.history__item__name}>Chiya</h1>
          <span className={classes.history__item__amount}>Rs 5</span>
        </div>
        <div className={classes.history__item}>
          <h1 className={classes.history__item__name}>Chiya</h1>
          <span className={classes.history__item__amount}>Rs 5</span>
        </div>
        <div className={classes.history__item}>
          <h1 className={classes.history__item__name}>Chiya</h1>
          <span className={classes.history__item__amount}>Rs 5</span>
        </div>
      </div>
    </section>
  );
};

export default Label;
