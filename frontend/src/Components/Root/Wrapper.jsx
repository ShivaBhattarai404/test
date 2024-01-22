import React, {Fragment} from 'react';
import MainNavigation from "../MainNavigation/MainNavigation";
import classes from "./Wrapper.module.css";

const Wrapper = (props) => {
  return (
    <Fragment>
      <main>
        <MainNavigation />
        <div className={classes.content}>
          {props.children}
        </div>
      </main>
    </Fragment>
  );
}

export default Wrapper