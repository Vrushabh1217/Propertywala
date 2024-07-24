import React from "react";
import classes from "../assets/Styles/blogCard.module.css";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div>
      <div className={classes.blogCard}>
        <Link to={`/blogDetails/${blog._id}`}>
          <img src={blog.blogImage} alt="img2" />
        </Link>
        <div className={classes.blogCardTitle}>
          <h3>{blog.title}</h3>
          <span>{blog.date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
