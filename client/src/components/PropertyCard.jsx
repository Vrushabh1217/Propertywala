import React, { useState } from "react";
import classes from "../assets/Styles/propertyCard.module.css";
import noImg from "../assets/images/PW_noImageFound.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faChartArea } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  let d = "type";
  let img = property?.propertyImage[0];

  if (property.purpose == "sale") {
    d = " for Sale";
  } else {
    d = " /month";
  }

  return (
    <div className={classes.propertyCard}>
      <img src={img} alt="image error" />
      <div className={classes.propertyCard_info}>
        <span className={classes.coloredText}>{"₹ " + property.price}</span>
        <span className={classes.greyText}>{d}</span>
        <p className={classes.pcBigText}>
          <Link
            to={`/propertyDetails/${property._id}`}
            style={{ textDecoration: "none" }}
          >
            {property.name}
          </Link>
        </p>
        <p className={classes.greyText}>{property.location}</p>
        <div className={classes.propertyCardNav}>
          <span className={classes.pcStats}>
            <FontAwesomeIcon icon={faBed} />
            <span>{property.bedsNum}</span>
          </span>
          <span className={classes.pcStats}>
            <FontAwesomeIcon icon={faBath} />
            <span>{property.bathsNum}</span>
          </span>
          <span className={classes.pcStats}>
            <FontAwesomeIcon icon={faChartArea} />
            <span>{property.area}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
