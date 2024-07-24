import React from "react";
import classes from "../assets/Styles/blogCardMini.css?inline";
import { Link, NavLink } from "react-router-dom";

const BLogCardMini = ({ blog }) => {
  return (
    <div>
      <NavLink
        to={`/blogDetails/${blog._id}`}
        style={{ textDecoration: "none" }}
        className={classes.featuredItem1}
      >
        <div className={classes.featuredItem1}>
          <img src={blog.blogImage} alt="img2" style={{ width: "100%" }} />
          <div>
            <h3>{blog.title}</h3>
            <span>{blog.date}</span>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default BLogCardMini;
