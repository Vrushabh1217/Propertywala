import React from "react";
import classes from "../assets/Styles/PrivacyPolicy.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={classes.PrivacyPolicy}>
      <main className={classes.ppmain}>
        <h2 className={classes.pph2}>Privacy Policy</h2>
        <p className={classes.ppp}>
          We respect your privacy and are committed to protecting your personal
          data. This privacy policy will inform you about how we look after your
          personal data when you visit our website, regardless of where you
          visit it from, and tell you about your privacy rights and how the law
          protects you.
        </p>

        <h3 className={classes.pph3}>Information We Collect</h3>
        <p className={classes.ppp}>
          We collect personal data, such as your name, email address, and phone
          number when you fill out a form on our website to buy, sell, or rent a
          property. We also collect information about your device, browser, and
          IP address to improve our website's functionality.
        </p>

        <h3 className={classes.pph3}>How We Use Your Information</h3>
        <p className={classes.ppp}>
          We use your personal data to provide you with the services you
          requested and to communicate with you about your property
          transactions. We also use your data for marketing purposes, such as
          sending you promotional emails and newsletters.
        </p>

        <h3 className={classes.pph3}>How We Share Your Information</h3>
        <p className={classes.ppp}>
          We may share your personal data with third-party service providers,
          such as payment processors and email marketing platforms, to help us
          provide our services to you. We may also share your data with law
          enforcement agencies and regulators when required by law.
        </p>

        <h3 className={classes.pph3}>How We Protect Your Information</h3>
        <p className={classes.ppp}>
          We take appropriate measures to protect your personal data from
          unauthorized access, alteration, disclosure, or destruction. We also
          regularly review our security measures to ensure they are up-to-date
          and effective.
        </p>

        <h3 className={classes.pph3}>Your Rights</h3>
        <p className={classes.ppp}>
          You have the right to access, correct, or delete your personal data we
          hold about you. You also have the right to object to the processing of
          your personal data for marketing purposes.
        </p>

        <h3 className={classes.pph3}>Contact Us</h3>
        <p className={classes.ppp}>
          If you have any questions or concerns about our privacy policy or how
          we handle your personal data, please contact us at
          privacy@realestatewebsite.com.
        </p>
      </main>

      <footer className={classes.ppfooter}>
        <p>&copy; 2023 Real Estate Website</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
