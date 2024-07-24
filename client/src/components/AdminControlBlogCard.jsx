import React, { useEffect } from "react";
import classes from "../assets/Styles/AdminControlBlogCard.module.css";
import { useState } from "react";

const AdminControlBlogCard = ({ blog }) => {
  const [deleted, setDeleted] = useState(false);
  const [csrfToken, setCsrfToken] = useState();

  useEffect(() => {
    // Fetch CSRF token from the server
    fetch('http://localhost:3003/csrf-token', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) => console.error('Error fetching CSRF token:', error));

  }, []);


  const removeBlogHandler = async () => {
    fetch(`http://localhost:3003/blogs/deleteBlog/${blog._id}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken, // Include CSRF token in the header
      },
    }).then(() => setDeleted(true));
  };

  return (
    <div>
      {!deleted && (
        <div className={classes.blogCardAdminControl}>
          <div className={classes.blogCardAdminControlChild}>
            <div>
              <p className={classes.icon}>{blog.title[0]}</p>
            </div>
            <div>
              <h2>{blog.title}</h2>
              <div className={classes.card__handle}>
                <span className={classes.handle}>{blog.date}</span>
              </div>
            </div>
          </div>
          <div className={classes.blogCardAdminControlButtons}>
            <button onClick={removeBlogHandler}>Remove Blog</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControlBlogCard;
