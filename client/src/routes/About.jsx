import React from "react";
import classes from "../assets/Styles/about-us.module.css";
import meetingImg from "../assets/images/PW_aboutUs_meeting_img.png";
import teamImg from "../assets/images/PW_team_img.png";
import peopleImg from "../assets/images/PW_peopleIcons.png";
import person1Img from "../assets/images/PW_aboutUs_person1.png";
import person2Img from "../assets/images/PW_aboutUs_person2.png";
import person3Img from "../assets/images/PW_aboutUs_person3.png";
import person4Img from "../assets/images/PW_aboutUs_person4.png";
import person5Img from "../assets/images/PW_aboutUs_person5.png";
import officeImg from "../assets/images/PW_aboutUS_office.webp";

const About = () => {
  return (
    <div className={classes.all}>
      <header>
        <div className={classes.split}>
          <div className={classes.contentContainer}>
            <h2>
              Discover Our Passion for Helping You Find Your
              <span className={classes.colouredText}>Dream Home</span> - Get to
              Know Us
            </h2>
            <br />
            <p>
              At PropertyWala, we are committed to finding you the perfect home.
              Our experienced team provides personalized service and expert
              guidance to help you make the best investment in your future.
            </p>
            <br />
            <br />
            <a href="/show-properties/rent">
              <button>View Properties</button>
            </a>
            <div className={classes.parentContainer}>
              <div className={classes.childContainer}>
                <h3>600+</h3>
                <p>happy property owners</p>
              </div>
              <div className={classes.childContainer}>
                <h3>5 years+</h3>
                <p>field experience</p>
              </div>
              <div className={classes.childContainer}>
                <h3>90 Cr+</h3>
                <p>property transactions</p>
              </div>
            </div>
          </div>
          <div className={classes.imageContainer}>
            <img src={meetingImg} alt="meeting" />
          </div>
        </div>
      </header>

      <section>
        <div className={classes.split}>
          <div>
            <img src={teamImg} alt="founders image" />
          </div>
          <div className={classes.contentContainer}>
            <h1>
              <span className={classes.colouredText}> PropertyWala</span>{" "}
              founders
            </h1>
            <p>
              We started this company with a simple goal in mind: to help people
              find their dream homes. As real estate professionals, we
              understand how daunting the home buying process can be, which is
              why we built this platform to make it easier and more enjoyable
              for you.
            </p>
            <p>
              Our team is dedicated to providing you with personalized service,
              expert guidance, and the latest technology to help you find the
              perfect property. We believe that everyone deserves a place they
              can call home, and we are committed to helping you find yours.
            </p>
          </div>
        </div>
      </section>

      <section className={classes.quote}>
        <h3>
          "Let us help you find your{" "}
          <span className={classes.colouredText}>dream home.</span> Our
          personalized service, expert guidance, and latest technology make home
          buying easier and enjoyable."
        </h3>
      </section>

      <section>
        <div className={classes.Testimonial}>
          <h1>Testimonials</h1>
          <p className={classes.greyText}>
            See the opinions of our property managers, landlords, and tenants.
          </p>
          <p>
            "I use PropertyWala practically every day to hunt for a second home,
            a vacation condo, or just to browse fantasy homes in different
            regions. Thank you, PropertyWala, for the enjoyable home searching
            and analysis! "
          </p>
          <span>
            Ram, <span className={classes.greyText}>Renter</span>
          </span>
          <img src={peopleImg} alt="peopleIcons" />
        </div>
      </section>

      <div className={classes.flexGrid}>
        <div>
          <img src={person1Img} alt="person1" />
          <h4>Abhishek</h4>
          <p>Student</p>
        </div>
        <div>
          <img src={person2Img} alt="person2" />
          <h4>Neelesh</h4>
          <p>Student</p>
        </div>
        <div>
          <img src={person3Img} alt="person3" />
          <h4>Vrushabh</h4>
          <p>Student</p>
        </div>
        <div>
          <img src={person4Img} alt="person4" />
          <h4>Rishabh</h4>
          <p>Student</p>
        </div>
        <div>
          <img src={person5Img} alt="person5" />
          <h4>Amruth</h4>
          <p>Student</p>
        </div>
      </div>

      <section>
        <div className={classes.newsletter}>
          <img src={officeImg} alt="office" />
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
                  <i className="fa-brands fa-facebook"></i>
                </span>
                <span>
                  <i className="fa-brands fa-twitter"></i>
                </span>
                <span>
                  <i className="fa-brands fa-instagram"></i>
                </span>
                <span>
                  <i className="fa-brands fa-linkedin"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
