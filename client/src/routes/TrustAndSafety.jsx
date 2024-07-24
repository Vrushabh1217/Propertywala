import React from "react";
import classes from "../assets/Styles/TrustAndSafety.module.css";
import { Link } from "react-router-dom";

const TrustAndSafety = () => {
  return (
    <div className={classes.tasbody}>
      <main className={classes.tasmain}>
        <section>
          <h1 className={classes.tash1}>Trust & Safety</h1>
          <p className={classes.tasp}>
            We understand that buying, selling, or renting a property can be a
            stressful experience. That's why we prioritize your safety and
            security when using our website. Here are some of the ways we ensure
            your trust:
          </p>
          <ul className={classes.tasul}>
            <li className={classes.tasli}>
              Verification of all user accounts to prevent fraud and scams
            </li>
            <li className={classes.tasli}>
              Secure payment system for all transactions
            </li>
            <li className={classes.tasli}>
              Protection of personal information with strict privacy policies
            </li>
            <li>24/7 customer support to assist with any concerns</li>
          </ul>
          <p className={classes.tasp}>
            If you have any questions or concerns about our Trust & Safety
            policies, please don't hesitate to{" "}
            <Link to="contact.html" className={classes.tasa}>
              contact us
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default TrustAndSafety;
