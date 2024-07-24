import React, { useEffect, useState } from "react";
import classes from "../assets/Styles/PropertyDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useLocation, useParams, useNavigate } from "react-router-dom";
import SimpleSliderPd from "../components/PropertyDetailsCarousel";



const PropertyDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const properties = useLoaderData();
  const property = properties.find((e) => e._id == id);
  const [wishlist, setWishlist] = useState();
  const [csrfToken, setCsrfToken] = useState();


  useEffect(() => {
    const setWishListFunction = async () => {

      const wish = await fetch(
        `http://localhost:3003/properties/checkWishlist/${user._id}/${property._id}`
      ).then((res) => res.json());
      setWishlist(wish.result)
    }

    // Fetch CSRF token from the server
    fetch('http://localhost:3003/csrf-token', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((error) => console.error('Error fetching CSRF token:', error));

    setWishListFunction();
    console.log(wishlist)
  }, [location, user, csrfToken]);



  const removePropertyHandler = async () => {
    const confirm = prompt("please enter password to delete this property!");
    if (confirm) {
      try {
        const response = await fetch(
          "http://localhost:3003/properties/removeProperty",
          {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
              'CSRF-Token': csrfToken, // Include CSRF token in the header
            },
            body: JSON.stringify({ userId: user._id, password: confirm, propertyId: property._id }),
          }
        );
        const data = await response.json();

        if (data.success) {
          alert(data.success);
          navigate("/profile");
        } else {
          alert(data.error)
        }

      } catch (error) {
        console.error("Network error:", error);
      }

    }
  };




  const [info, setInfo] = useState(false);

  const style = info ? { display: "block" } : { display: "none" };

  const getInfoHandler = () => {
    info ? setInfo(false) : setInfo(true);
  };

  const wishListHandler = async () => {
    if (wishlist) {
      fetch(`http://localhost:3003/properties/removeFromWishlist/${user._id}/${property._id}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'CSRF-Token': csrfToken, // Include CSRF token in the header
        },
      }).then(setWishlist(false))

    } else {
      fetch(`http://localhost:3003/properties/addToWishlist/${user._id}/${property._id}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'CSRF-Token': csrfToken, // Include CSRF token in the header
        },
      }).then(setWishlist(true))

    }
  }

  return (
    <div className={classes.propertyDetailsAll}>
      {property && (
        <>
          <div className={classes.pdHeader}>
            <div className={classes.headerLabels}>
              <p>{property.name}</p>
              <span>{property.location}, </span>
              <span>{property.locality}</span>
            </div>
            <div className={classes.dfButtons}>
              {user && user.email == property.lister.email ? <button onClick={removePropertyHandler}>Delete</button> : ""}
              {user && wishlist ? <button onClick={wishListHandler}>Wishlisted</button> : <button onClick={wishListHandler}>Wishlist</button>}
            </div>
          </div>
          <div className={classes.pdCarousel}>
            <SimpleSliderPd propertyImage={property.propertyImage} />
          </div>
          <div className={classes.pdStats}>
            <p>
              <p>Bedrooms</p>
              <p>{property.bedsNum}</p>
            </p>
            <p>
              <p>Bathrooms</p>
              <p>{property.bathsNum}</p>
            </p>
            <p>
              <p>Square Area</p>
              <p>{property.area}</p>
            </p>
            <p>
              <p>Status</p>
              <p>Active</p>
            </p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <h2>About this home</h2>
            <p>{property.description}</p>
            <div className={classes.ownerParentContainer}>
              <p>Listed by property owner</p>
              <div className={classes.ownerContainer}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <h4>{property.lister.name}</h4>
                    <p>{property.lister.description}</p>
                    <div style={style} id="moreInfo">
                      <p>{property.lister.email}</p>
                      <p>{property.lister.mobileNumber}</p>
                    </div>
                  </div>
                </div>
                <div className={classes.buttons}>
                  <button>Ask a question</button>
                  <button onClick={getInfoHandler}>Get more info</button>
                </div>
              </div>
            </div>
            <hr />
            <div className={classes.rentalFeatures}>
              <div className={classes.childContainer}>
                <div className={classes.rentalData}>
                  <p>Date available</p>
                  <b>Available now</b>
                </div>
                <div className={classes.rentalData}>
                  <p>Type</p>
                  <b>{property.purpose}</b>
                </div>
                <div className={classes.rentalData}>
                  <p>City</p>
                  <b>{property.location}</b>
                </div>
                <div className={classes.rentalData}>
                  <p>Year Built</p>
                  <b>{property.yearBuilt}</b>
                </div>
              </div>
              <div className={classes.childContainer}>
                <div className={classes.rentalData}>
                  <p>Size</p>
                  <b>{property.area} sqft</b>
                </div>
                <div className={classes.rentalData}>
                  <p>Lot Size</p>
                  <b>{property.lotSize} sqft</b>
                </div>
                <div className={classes.rentalData}>
                  <p>Parking Area</p>
                  <p>{property.parkingArea}</p>
                </div>
                <div className={classes.rentalData}></div>
              </div>
            </div>
            <hr />
            <p className={classes.terms}>
              You agree to PropertyWala's Terms of Use & Privacy Policy. By
              choosing to contact a property, you also agree that
              PropertyWalaGroup, landlords, and property managers may call or
              text you about any inquiries you submit through our services,which
              may involve use of automated means and prerecorded/artifhcial
              voices. You don't need to consent as acondition of renting any
              property, or buying any other goods or services. Message/data
              rates may apply.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
