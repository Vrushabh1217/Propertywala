import React from "react";
import classes from "../assets/Styles/pricingApp.module.css";

import { useState } from "react";
import PricingCard from "../components/PricingCard";

const Cirrcle = ({ left }) => {
  const l = left + "rem";

  return <div className={classes.circle} style={{ left: l }}></div>;
};

const PricingPlan = () => {
  const [selectMonthly, setSelectMonthly] = useState(true);

  const slideSwitchHandler = () => {};

  return (
    <div className={classes.PricingApp}>
      <div className={classes.appContainer}>
        {/* Header */}
        <header>
          <h1 className={classes.headerTopic}>Our Pricing Plan</h1>
          <div className={classes.headerRow}>
            <p>Rent/Buy</p>
            <label className={classes.priceSwitch}>
              <input
                className={classes.priceCheckbox}
                onChange={() => {
                  setSelectMonthly((prev) => !prev);
                }}
                type="checkbox"
              />
              <div
                className={classes.switchSlider1}
                onClick={slideSwitchHandler}
              >
                {selectMonthly ? (
                  <Cirrcle left={1.3} />
                ) : (
                  <Cirrcle left={0.3} />
                )}
              </div>
            </label>
            <p>List</p>
          </div>
        </header>
        {/* Cards here */}
        <div className={classes.pricingCards}>
          <PricingCard
            title="Basic"
            price={selectMonthly ? "₹250" : "₹300"}
            storage={
              selectMonthly ? "List 5 properties" : "Access 50 properties"
            }
            users="7 days high priority"
            sendUp="1 Month"
          />
          <PricingCard
            title="Deluxe"
            price={selectMonthly ? "₹750" : "₹900"}
            storage={
              selectMonthly ? "List 10 properties" : "Access 100 properties"
            }
            users="14 days high priority"
            sendUp="3 Months"
          />
          <PricingCard
            title="Premium"
            price={selectMonthly ? "₹1500" : "₹1800"}
            storage={
              selectMonthly ? "List 50 properties" : "Access 500 properties"
            }
            users="30 days high priority"
            sendUp="1 Year"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
