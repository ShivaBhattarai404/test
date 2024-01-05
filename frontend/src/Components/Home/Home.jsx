import React from "react";

import classes from "./Home.module.css";

import Card from "../UI/Card/Card";
import { Link } from "react-router-dom";

const Label = (props) => {
  return (
    <Card className={classes.card}>
      <Link to={`/label/${props.id}`}>
        <div className={classes.card__title}>{props.name}</div>
        <div className={classes.card__deposit}>
          Deposit: Rs {props.budget}/-
        </div>
        <div className={classes.card__expenses}>
          Expenses: Rs {props.budget}/-
        </div>
      </Link>
    </Card>
  );
};
const Home = (props) => {
  return (
    <div className={classes.home}>
      <h1>Months</h1>
      <div className={classes.labelWrapper}>
        {props.labels.length > 0 ? (
          props.labels.map((label) => (
            <Label
              key={label._id}
              id={label._id}
              name={label.name}
              budget={label.budget}
              expenses={label.expenses}
            />
          ))
        ) : (
          <h1>No Labels Found</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
