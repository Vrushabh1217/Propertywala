import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import About from "./routes/About";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Profile from "./routes/Profile";
import AdminControl from "./routes/AdminControl";
import Footer from "./components/Footer";
import ShowProperties from "./routes/ShowProperties";
import ListProperty from "./routes/ListProperty";
import Blogs from "./routes/Blogs";
import ComposeBlog from "./routes/ComposeBlog";
import Sidebar from "./components/SideBar";
import PricingPlan from "./routes/PricingPlan";
import Header from "./components/Header";
import Help from "./routes/Help";
import TermsOfService from "./routes/TermsOfService";
import TrustAndSafety from "./routes/TrustAndSafety";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import FAQ from "./routes/FAQ";
import { setUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PropertyDetails from "./routes/PropertyDetails";
import BlogDetails from "./routes/BlogDetails";
import { NextUIProvider } from "@nextui-org/react";

const propertiesLoader = async () => {
  const properties = await fetch("http://localhost:3003/properties/all").then(
    (res) => res.json()
  );

  return properties;
};

const blogsLoader = async () => {
  const blogs = await fetch("http://localhost:3003/blogs/all").then((res) =>
    res.json()
  );
  return blogs;
};

const getUserById = async () => {};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <Home />
          <Footer />
        </div>
      </>
    ),
    loader: propertiesLoader,
  },
  {
    path: "/show-properties",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <ShowProperties type={"all"} />
          <Footer />
        </div>
      </>
    ),
    loader: propertiesLoader,
  },
  {
    path: "/show-properties/:purpose/:homeQuery?",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <ShowProperties />
          <Footer />
        </div>
      </>
    ),
    loader: propertiesLoader,
  },

  {
    path: "/about-us",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <About />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <SignIn />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <SignUp />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <Profile />
          <Footer />
        </div>
      </>
    ),
    loader: propertiesLoader,
  },
  {
    path: "/list-property",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <ListProperty />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/blogs",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <Blogs />
          <Footer />
        </div>
      </>
    ),
    loader: blogsLoader,
  },
  {
    path: "/compose-blog",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <ComposeBlog />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/pricing-plans",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <PricingPlan />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/help",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <Help />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/FAQ",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <FAQ />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/privacy-policy",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <PrivacyPolicy />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/trust-and-safety",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <TrustAndSafety />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/terms-of-service",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <TermsOfService />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/admin-control",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <AdminControl />
          <Footer />
        </div>
      </>
    ),
  },
  {
    path: "/propertyDetails/:id",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <PropertyDetails />
          <Footer />
        </div>
      </>
    ),
    loader: propertiesLoader,
  },
  {
    path: "/blogDetails/:id",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <BlogDetails />
          <Footer />
        </div>
      </>
    ),
    loader: blogsLoader,
  },
  {
    path: "/*",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "4rem" }}>
          <h1 style={{ padding: "20rem", fontSize: "4rem" }}>
            404 : Page not found
          </h1>
          <Footer />
        </div>
      </>
    ),
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3003/auth/verify", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data.user) {
          //set user
          dispatch(setUser(data.user));
          console.log("Login successful:", data.user);
        } else {
          console.error("Login failed");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
      }
    };

    fetchUser();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
