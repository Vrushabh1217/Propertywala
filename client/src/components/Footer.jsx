import React from "react";
import classes from "../assets/styles/footer.module.css";
import { Link } from "react-router-dom";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className={classes.homeFooter}>
        <Link className={classes.logo} to="../src/index.html">
          PropertyWala
        </Link>
        <div className={classes.wrapper}>
          <div className={classes.childWrapper}>
            <div className={classes.notShow}></div>
            <div className={classes.footerSection}>
              <h5>SELL A HOME</h5>
              <p>Request an offer</p>
              <p>Pricing</p>
              <p>Reviews</p>
              <p>Stories</p>
            </div>
            <div className={classes.footerSection}>
              <h5>BUY A HOME</h5>
              <p>Buy</p>
              <p>Finance</p>
            </div>
            <div className={classes.footerSection}>
              <h5>BUY, RENT AND SELL</h5>
              <p>Buy and sell properties</p>
              <p>Rent home</p>
              <p>Builder trade-up</p>
            </div>
          </div>

          <div className={classes.childWrapper}>
            <div className={classes.notShow}></div>
            <div className={classes.footerSection}>
              <h5>TERMS & PRIVACY</h5>
              <Link to="/trust-and-safety">
                <p>Trust & Safety</p>
              </Link>
              <Link to="terms-of-service">
                <p>Terms of Service</p>
              </Link>
              <Link to="privacy-policy">
                <p>Privacy Policy</p>
              </Link>
            </div>
            <div className={classes.footerSection}>
              <h5>ABOUT</h5>
              <p>Company</p>
              <p>How it works</p>
              <p>Contact</p>
              <p>Investors</p>
            </div>
            <div className={classes.footerSection}>
              <h5>RESOURCES</h5>
              <Link to="/blogs">
                <p>Blog</p>
              </Link>
              <Link to="/help">
                <p>Guides</p>
              </Link>
              <Link to="/FAQ">
                <p>FAQ</p>
              </Link>
              <Link to="/help">
                <p>Help Center</p>
              </Link>
            </div>
          </div>
        </div>

        <div className={classes.commonFooter}>
          <span>PropertyWala</span>
          <div className={classes.contactIcons}>
            <span>
              <FaFacebookF />
            </span>
            <span>
              <AiOutlineInstagram />
            </span>
            <span>
              <FaTwitter />
            </span>
            <span>
              <AiFillLinkedin />
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
