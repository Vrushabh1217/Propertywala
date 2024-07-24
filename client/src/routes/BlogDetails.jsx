import React, { useEffect, useState } from "react";
import classes from "../assets/Styles/blog-details.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import authorImg from "../assets/images/PW_aboutUs_person2.png";
import blog1img from "../assets/images/PW_blogs_image6.jpg";
import blog2img from "../assets/images/PW_blogs_image11.jpg";
import { useLoaderData, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const BlogDetailsPage = () => {
  const { id } = useParams();
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

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);


  const blogs = useLoaderData();
  const blog = blogs.find((e) => e._id == id);


  const deleteBlogHandler = async () => {
    const confirm = prompt("please enter \"" + blog.title + "\" to delete this blog");

    if (confirm) {
      if (confirm == blog.title) {
        fetch(`http://localhost:3003/blogs/deleteBlog/${blog._id}`, {
          method: "POST",
          credentials: 'include',
          headers: {
            'CSRF-Token': csrfToken, // Include CSRF token in the header
          },
        }).then(() => alert("This blog has been deleted!"));

        navigate("/blogs");

      } else {
        alert("wrong blog title!")
      }
    }



  }

  return (
    <div className={classes.blogDetailsALL}>
      <header className={classes.header}>
        <h1>{blog.title}</h1>
        {user && blog.blog_user_id == user._id ? <button className={classes.deleteBlogButton} onClick={deleteBlogHandler}>delete blog</button> : ""}
        <div>
          <p>
            By <span>{blog.blogAuthor}</span> .{" "}
            <span className={classes.greyText}>Last Updated </span>
            {blog.date}
          </p>
        </div>
        <div className={classes.contact1}>
          <FaLinkedin />
          <FaTwitter />
          <FaInstagram />
        </div>
      </header>

      <div className={classes.image1}>
        <img src={blog.blogImage} alt="img2" />
      </div>

      <section>
        <div
          className={classes.Info}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        <div className={classes.authorDetails}>
          <img src={authorImg} alt="p2" />
          <div>
            <span>{blog.blogAuthor}</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className={classes.sm}>Similar Stories</h2>

        <div className={classes.parentContainer}>
          <div className={classes.childContainer}>
            <img src={blog1img} alt="blogImage6" />
            <div>
              <h3>How WeWork India built its success story?</h3>
              <span>February 8th, 2023</span>
            </div>
          </div>

          <div className={classes.childContainer}>
            <img src={blog2img} alt="blo{classes.Image1}" />
            <div>
              <h3>Budget 2023- What's in it for Real Estate sector?</h3>
              <span>February 2nd, 2023</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className={classes.contentContainer}>
          <h2>Sign up for our email news letter</h2>
          <p className={classes.greyText}>
            keep up with the most recent information about the real estate
            market!
          </p>
          <span>
            <input type="email" name="" id="" />
            <button>Sign Up</button>
          </span>

          <div className={classes.contact}>
            <h3>Contact Us:</h3>
            <div>
              <span>
                <FaFacebook />
              </span>
              <span>
                <FaTwitter />
              </span>
              <span>
                <FaInstagram />
              </span>
              <span>
                <FaLinkedin />
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
