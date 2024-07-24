import React from "react";
import styles from "../assets/Styles/Sidebar.module.css";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLandmark } from "@fortawesome/free-solid-svg-icons";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
// import rent from "../assets/Styles/rent";
// import aboutUsImg from "../assets/Styles/aboutUs.svg";
// import adminImg from "../assets/Styles/admin.svg";
// import blogImg from "../assets/Styles/blog.svg";
// import buyImg from "../assets/Styles/buy.svg";

function Sidebar() {
  const [sideBar, setSideBar] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const SideBarHandler = () => {
    sideBar ? setSideBar(false) : setSideBar(true);
  };

  const HoverText = ({ text, top }) => {
    const t = 3.75 + top * 3.5 + "rem";
    return (
      <>
        <Link
          className={styles.hoverText}
          style={{ left: "4rem", top: t }}
          to="/"
        >
          <button>{text}</button>
        </Link>
      </>
    );
  };

  const miniSideBar = (
    <div>
      <div className={styles.miniSidebar}>
        <button className={styles.barsButton} onClick={SideBarHandler}>
          <FontAwesomeIcon icon={faBars} />
        </button>

        <Link className={styles.sidebarLink} to="/">
          <button className={styles.sidebarButton}>
            <FontAwesomeIcon icon={faLandmark} />
          </button>
          <HoverText text="PropertyWala" top={0} />
        </Link>

        <Link className={styles.sidebarLink} to="/show-properties/rent">
          <button className={styles.sidebarButton}>R</button>
          <HoverText text="Rent" top={0.9} />
        </Link>

        <Link className={styles.sidebarLink} to="/show-properties/sale">
          <button className={styles.sidebarButton}>B</button>
          <HoverText text="Buy" top={1.9} />
        </Link>

        <Link className={styles.sidebarLink} to="/list-property">
          <button className={styles.sidebarButton}>S</button>
          <HoverText text="Sell" top={2.9} />
        </Link>

        <Link className={styles.sidebarLink} to="/blogs">
          <button className={styles.sidebarButton}>BP</button>
          <HoverText text="Blog Post" top={3.75} />
        </Link>

        <Link className={styles.sidebarLink} to="/help">
          <button className={styles.sidebarButton}>H</button>
          <HoverText text="Help" top={4.75} />
        </Link>

        <Link className={styles.sidebarLink} to="/about-us">
          <button className={styles.sidebarButton}>AU</button>
          <HoverText text="About Us" top={5.75} />
        </Link>

        <Link className={styles.sidebarLink} to="/pricing-plans">
          <button className={styles.sidebarButton}>P</button>
          <HoverText text="Premium" top={6.75} />
        </Link>

        {user && (user?.isCertified? 
        <>
          <Link className={styles.sidebarLink} to="/compose-blog">
          <button className={styles.sidebarButton}>C</button>
          <HoverText text="Compose" top={7.75} />
        </Link></>: "")}

        {user && (user?.isAdmin? 
        <>
          <Link className={styles.sidebarLink} to="/admin-control">
          <button className={styles.sidebarButton}>AD</button>
          <HoverText text="Admin Controls" top={8.75} />
        </Link>

        </>: "")}

        
      </div>
    </div>
  );

  const fullSideBar = (
    <>
      <div className={styles.sidebar}>
        <button className={styles.barsButton} onClick={SideBarHandler}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Link className={styles.sidebarLink} to="/">
          <button className={styles.sidebarButton}>PropertyWala</button>
        </Link>

        <Link className={styles.sidebarLink} to="/show-properties/rent">
          <button className={styles.sidebarButton}>Rent</button>
        </Link>

        <Link className={styles.sidebarLink} to="/show-properties/sale">
          <button className={styles.sidebarButton}>Buy</button>
        </Link>

        <Link className={styles.sidebarLink} to="/list-property">
          <button className={styles.sidebarButton}>Sell</button>
        </Link>

        <Link className={styles.sidebarLink} to="/blogs">
          <button className={styles.sidebarButton}>Blog Post</button>
        </Link>

        <Link className={styles.sidebarLink} to="/help">
          <button className={styles.sidebarButton}>Help</button>
        </Link>

        <Link className={styles.sidebarLink} to="/about-us">
          <button className={styles.sidebarButton}>About Us</button>
        </Link>

        <Link className={styles.sidebarLink} to="/pricing-plans">
          <button className={styles.sidebarButton}>Premium</button>
        </Link>

        {user && (user?.isCertified? 
        <>
          <Link className={styles.sidebarLink} to="/compose-blog">
          <button className={styles.sidebarButton}>Compose</button>
        </Link>
        </>: "")}

        {user && (user?.isAdmin? 
        <>
          <Link className={styles.sidebarLink} to="/admin-control">
          <button className={styles.sidebarButton}>Admin Controls</button>
        </Link>
        </>: "")}
        

        
      </div>
    </>
  );

  const Sidebar = sideBar ? fullSideBar : miniSideBar;

  return <div className={styles.sidebarContainer}>{Sidebar}</div>;
}

export default Sidebar;
