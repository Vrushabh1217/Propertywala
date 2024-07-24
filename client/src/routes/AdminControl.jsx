import React, { useEffect } from "react";
import classes from "../assets/Styles/adminControl.module.css";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import AdminControlUserCard from "../components/AdminControlUserCard";
import AdminControlPropertyCard from "../components/AdminControlPropertyCard";
import AdminControlBlogCard from "../components/AdminControlBlogCard";

const AdminControl = () => {
  const [AcType, setAcType] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [csrfToken, setCsrfToken] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const properties = await fetch(
        "http://localhost:3003/properties/all"
      ).then((res) => res.json());
      const blogs = await fetch("http://localhost:3003/blogs/all").then((res) =>
        res.json()
      );

      const users = await fetch("http://localhost:3003/users/all").then((res) =>
        res.json()
      );

      // Fetch CSRF token from the server
      fetch('http://localhost:3003/csrf-token', {
        method: 'GET',
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => setCsrfToken(data.csrfToken))
        .catch((error) => console.error('Error fetching CSRF token:', error));


      setProperties(properties);
      setBlogs(blogs);
      setUsers(users);
    };

    fetchData();
  }, []);

  const AdminControlTypeHandler = (type) => {
    setAcType(type);
  };

  //Jodit editor settings
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const config = {
    readonly: false,
    placeholder: "Compose your Mail...",
    toolbarButtonSize: "small",
    minHeight: 300,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "superscript",
      "subscript",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "selectall",
      "align",
      "undo",
      "redo",
      "cut",
      "hr",
      "eraser",
      "table",
      "|",
      "link",
      "unlink",
      "|",
      "fullsize",
      "|",
      "print",
      "about",
    ],
  };

  let AcContent = <></>;

  const allMailHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);

    fetch(`http://localhost:3003/allMail`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify(Object.fromEntries(formData)),

      headers: {
        'CSRF-Token': csrfToken,
        "Content-Type": "application/json",
      },
    });

    setSubject("");
    setContent("");
  };

  const AcContent1 = (
    <>
      <div className={classes.homeContent}>
        <h2>User</h2>
        <p>userEmail@gmail.com</p>
      </div>
      <div className={classes.adminForm}>
        <form onSubmit={allMailHandler} className={classes.aform}>
          <label htmlFor="subject"></label>
          <input
            type="text"
            placeholder="Enter subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className={classes.content}>
            <JoditEditor
              className={classes.Jeditor}
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <button id="BfButton1" type="submit" className={classes.abutton}>
            Mail all users
          </button>
        </form>
      </div>
    </>
  );

  const AcContent2 = (
    <>
      <div className={classes.usersContent}>
        {users &&
          users.map((user) => (
            <AdminControlUserCard user={user} key={user._id} />
          ))}
      </div>
    </>
  );

  const AcContent3 = (
    <>
      <div className={classes.propertiesContent}>
        {properties &&
          properties.map((property) => (
            <AdminControlPropertyCard property={property} key={property._id} />
          ))}
      </div>
    </>
  );

  const AcContent4 = (
    <>
      <div className={classes.blogsContent}>
        {blogs &&
          blogs.map((blog) => (
            <AdminControlBlogCard blog={blog} key={blog._id} />
          ))}
      </div>
    </>
  );

  switch (AcType) {
    case 1:
      AcContent = AcContent1;

      break;
    case 2:
      AcContent = AcContent2;

      break;
    case 3:
      AcContent = AcContent3;

      break;
    case 4:
      AcContent = AcContent4;
      break;

    default:
      break;
  }

  return (
    <div className={classes.AdminControlall}>
      <div className={classes.ACNavBar}>
        <p
          onClick={() => {
            AdminControlTypeHandler(1);
          }}
        >
          Home
        </p>
        <p
          onClick={() => {
            AdminControlTypeHandler(2);
          }}
        >
          Users
        </p>
        <p
          onClick={() => {
            AdminControlTypeHandler(3);
          }}
        >
          Properties
        </p>
        <p
          onClick={() => {
            AdminControlTypeHandler(4);
          }}
        >
          Blogs
        </p>
      </div>
      <div className={classes.AcContentContainer}>{AcContent}</div>
    </div>
  );
};

export default AdminControl;
