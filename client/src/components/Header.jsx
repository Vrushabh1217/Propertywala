import React from "react";
import classes from "../assets/Styles/Header.module.css";

const Header = () => {
  return (
    <div className={classes.head}>
      <p>PropertyWala</p>
      <p className={classes.slogan}>Your Key to Home Bliss!</p>
    </div>
  );
};

export default Header;
