import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import classes from "../assets/Styles/Tabs.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const RbsTabs = () => {
  const [rbsType, setRbsType] = useState(0);
  const [homeQuery, setHomeQuery] = useState("");

  return (
    <>
      <Tabs
        className={classes.TabsContainer}
        defaultIndex={0}
        onSelect={(index) => setRbsType(index)}
      >
        <TabList style={{ border: "none", margin: 0 }}>
          <Tab
            style={
              rbsType === 0
                ? {
                    margin: 0,
                    border: 0,
                    color: "#7164F0",
                    textDecoration: "none",
                  }
                : {
                    textDecoration: "none",
                  }
            }
          >
            Rent
          </Tab>
          <Tab
            style={
              rbsType === 1
                ? {
                    margin: 0,
                    border: 0,
                    color: "#7164F0",
                    textDecoration: "none",
                  }
                : {
                    textDecoration: "none",
                  }
            }
          >
            Buy
          </Tab>
          <Tab
            style={
              rbsType === 2
                ? {
                    margin: 0,
                    border: 0,
                    color: "#7164F0",
                    textDecoration: "none",
                  }
                : {
                    textDecoration: "none",
                  }
            }
          >
            Sell
          </Tab>
        </TabList>

        <TabPanel
          style={{
            background: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <input
            className={classes.tabsInput}
            value={homeQuery}
            onChange={(e) => {
              setHomeQuery(e.target.value);
            }}
          />
          <Link to={`/show-properties/rent/${homeQuery}`}>
            <button className={classes.tabsButton}>Rent Now!</button>
          </Link>
        </TabPanel>

        <TabPanel
          style={{
            background: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <input
            className={classes.tabsInput}
            value={homeQuery}
            onChange={(e) => {
              setHomeQuery(e.target.value);
            }}
          />
          <Link to={`/show-properties/sale/${homeQuery}`}>
            <button className={classes.tabsButton}>Buy Now!</button>
          </Link>
        </TabPanel>

        <TabPanel
          style={{
            background: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <span className={classes.tabsSpan}>
            Increase the reach of your property and get higher bids!
          </span>
          <Link to="/list-property">
            <button className={classes.tabsButton}>List Now!</button>
          </Link>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default RbsTabs;
