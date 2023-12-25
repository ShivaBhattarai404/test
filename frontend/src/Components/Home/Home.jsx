import React from "react";

import classes from "./Home.module.css";

import Card from "../UI/Card/Card";
import { Link } from "react-router-dom";

const Label = (props) => {
  return (
    <Card className={classes.card}>
      <Link to="/label/djfgjhf">
        <div className={classes.card__title}>January{props.id}</div>
        <div className={classes.card__deposit}>Deposit: Rs 6000/-</div>
        <div className={classes.card__expenses}>Expenses: Rs 3000/-</div>
      </Link>
    </Card>
  );
};
const Home = () => {
  return (
    <div className={classes.home}>
      <h1>Months</h1>
      <div className={classes.labelWrapper}>
        <Label id='1' />
        <Label id='2' />
        <Label id='3' />
        <Label id='4' />
      </div>
    </div>
  );
};

export default Home;
