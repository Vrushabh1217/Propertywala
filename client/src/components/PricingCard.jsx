import React from "react";
import { Link } from "react-router-dom";

import classes from "../assets/styles/PricingCard.module.css";
const PricingCard = ({ title, price, storage, users, sendUp }) => {
  return (
    <div className={classes.PricingCard}>
      <header>
        <p className={classes.cardTitle}>{title}</p>
        <h1 className={classes.cardPrice}>{price}</h1>
      </header>
      {/* features here */}
      <div className={classes.cardFeatures}>
        <div className={classes.cardStorage}>{storage}</div>
        <div className={classes.cardUsersAllowed}>{users} </div>
        <div className={classes.cardSendUp}>{sendUp}</div>
      </div>
      <button className={classes.cardBtn}>READ MORE</button>
    </div>
  );
};

export default PricingCard;
