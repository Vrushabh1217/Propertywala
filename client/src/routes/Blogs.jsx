import React, { useEffect, useState } from "react";
import classes from "../assets/Styles/blogs.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import SimpleSlider from "../components/blogCarousel";
import PW_aboutUS_office from "../assets/images/PW_aboutUS_office.webp";
import BlogCard from "../components/BlogCard";
import { Link, useLoaderData } from "react-router-dom";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import BLogCardMini from "../components/BLogCardMini";

const Blogs = () => {
  const blogs = useLoaderData();
  const [mail, setMail] = useState("");
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

  const addMailHandler = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3003/mail/${mail}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'CSRF-Token': csrfToken, // Include CSRF token in the header
      },
    });
    setMail("");
  };

  return (
    <div className={classes.all}>
      <header className={classes.header1}>
        <h2>
          Revolutionize your property game with the latest updates from
          PropertyWala!
        </h2>
        <p>
          Considering making real estate investments? Follow PropertyWala's
          latest stories and news to stay informed.
        </p>
        <div className={classes.icontainer}>
          <input
            className={classes.input1}
            type="email"
            placeholder="Enter your email address"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <button onClick={addMailHandler}>Sign up</button>
        </div>
      </header>
      <section>
        <div className={classes.split}>
          <div>
            <p>{blogs[0].date}</p>
            <h3>{blogs[0].title}</h3>
            <Link
              to={`/blogDetails/${blogs[0]._id}`}
              style={{ textDecoration: "none" }}
            >
              <button>Know more</button>
            </Link>
          </div>
          <img
            src={blogs[0].blogImage}
            alt="img2"
            className={classes.imgstyle}
          />
        </div>
      </section>

      <section>
        <h2 className={classes.underline}>Our current developments.</h2>
        <div className={classes.flexGrid}>
          {blogs.map((blog) => (
            <>
              <BlogCard blog={blog} />
            </>
          ))}
        </div>
      </section>

      <div className={classes.blogCarousel}>
        <SimpleSlider blogs={blogs.slice(0, 6)} />
      </div>

      <section>
        <div className={classes.fbText}>
          <h2 className={classes.underline}>Featured Blogs</h2>
        </div>
        <div className={classes.featuredBlogsGrid}>
          {blogs.slice(0, 8).map((blog) => (
            <>
              <BLogCardMini blog={blog} />
            </>
          ))}
        </div>
      </section>

      <section>
        <div className={classes.newsletter}>
          <img src={PW_aboutUS_office} alt="office" />
          <div className={classes.contentContainer}>
            <h2>Sign up for our email news letter</h2>
            <p className={classes.greyText}>
              keep up with the most recent information about the real estate
              market!
            </p>
            <span>
              <input
                type="email"
                name=""
                id=""
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <button onClick={addMailHandler}>Sign Up</button>
            </span>

            <div className={classes.contact}>
              <h3>Contact Us:</h3>
              <div>
                <span>
                  <FontAwesomeIcon icon={faFacebook} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faLinkedin} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
