import classes from "../assets/Styles/listProperty.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cloudUrl = "https://api.cloudinary.com/v1_1/diya8tmxd/image/upload";
const preset = "ngjbzrk4";

const ListProperty = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const [images, setImages] = useState([]);
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


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [imgErr, setImgErr] = useState(false);

  const propertyFormHandler = async (data) => {
    if (data.propertyImages.length > 3) {
      setImgErr(true);
    } else {
      setImgErr(false);

      //get urls
      const imageUrls = [];
      for (let index = 0; index < images.length; index++) {
        const image = images[index];
        const formData = new FormData();
        // console.log(image);
        formData.append("file", image);
        formData.append("upload_preset", preset);
        const res = await axios.post(cloudUrl, formData);
        const url = res.data.secure_url;
        imageUrls.push(url);
      }

      try {
        await fetch("http://localhost:3003/properties/listProperty", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
            'CSRF-Token': csrfToken, // Include CSRF token in the header
          },
          body: JSON.stringify({
            property: data,
            user_id: user._id,
            images: imageUrls,
          }),
        });
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
        toast.error("Property upload error")
      }
      toast.success("Your property has been successfully uploaded!");

      reset();
    }
  };

  return (
    <>
      <ToastContainer />
      <header>
        <div>
          <h2>Rent/Sell your property</h2>
          <p>list now to increase the reach of your property</p>
        </div>
      </header>

      <section>
        <form
          onSubmit={handleSubmit(propertyFormHandler)}
          encType="multipart/form-data"
        >
          <div className={classes.container}>
            <div className={classes.personalDetails}>
              <h3>Personal Details</h3>
              <label htmlFor="Ownership">I am the</label>
              <select
                {...register("listerRelation", {
                  required: true,
                })}
                name="listerRelation"
                id="listerRelation"
              >
                <option value="owner">Owner</option>
                <option value="agent">Agent</option>
                <option value="builder">Builder</option>
              </select>
              <label htmlFor="name">Name</label>
              <input
                {...register("listerName", {
                  required: "Your name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "please enter valid name",
                  },
                })}
                type="text"
                placeholder="Enter your name"
                name="listerName"
                id="listerName"
              />
              <p className={classes.Ierror}>{errors.listerName?.message}</p>
              <label htmlFor="name">Your profession</label>
              <input
                {...register("listerDescription", {
                  required: "Your profession is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "please enter valid details",
                  },
                })}
                type="text"
                placeholder="Enter your profession"
                name="listerDescription"
                id="listerDescription"
              />
              <p className={classes.Ierror}>
                {errors.listerDescription?.message}
              </p>
              <label htmlFor="mobileNumber">Mobile number</label>
              <input
                {...register("listerMobileNumber", {
                  required: "mobile number is required",
                  pattern: {
                    value: /^[6789]\d{9}$/,
                    message: "please enter valid mobile number without +91",
                  },
                })}
                type="tel"
                placeholder="Enter your mobile number"
                name="listerMobileNumber"
                id="listerMobileNumber"
              />
              <p className={classes.Ierror}>
                {errors.listerMobileNumber?.message}
              </p>
              <label htmlFor="email">Email</label>
              <input
                {...register("listerEmail", {
                  required: "email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "please enter valid email",
                  },
                })}
                type="email"
                name="listerEmail"
                id="listerEmail"
              />
              <p className={classes.Ierror}>{errors.listerEmail?.message}</p>
            </div>

            <div className={classes.propertyDetails}>
              <h3>Property Details</h3>
              <label htmlFor="propertyName">Property Name</label>
              <input
                {...register("propertyName", {
                  required: "property name is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "please enter valid name",
                  },
                })}
                type="text"
                placeholder="Enter the name of property"
                name="propertyName"
                id="propertyName"
              />
              <p className={classes.Ierror}>{errors.propertyName?.message}</p>

              <label htmlFor="propertyPrice">Property Price</label>
              <input
                type="number"
                {...register("propertyPrice", {
                  required: "property price is required",
                  min: {
                    value: 1000,
                    message: "minimum price : 1000",
                  },
                  max: 1000000000,
                })}
                placeholder="Enter price of the property"
                name="propertyPrice"
                id="propertyPrice"
              />
              <p className={classes.Ierror}>{errors.propertyPrice?.message}</p>

              <label htmlFor="propertyType">For</label>
              <div>
                <select
                  {...register("propertyPurpose", {
                    required: "required!",
                  })}
                  id="propertyPurpose"
                  name="propertyPurpose"
                  required
                >
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
                <p className={classes.Ierror}>
                  {errors.propertyPurpose?.message}
                </p>
              </div>

              <label htmlFor="City">City</label>
              <input
                {...register("propertyCity", {
                  required: "property city is required!",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "please enter a valid city",
                  },
                })}
                type="text"
                name="propertyCity"
                id="propertyCity"
                placeholder="Enter City"
              />
              <p className={classes.Ierror}>{errors.propertyCity?.message}</p>

              <label htmlFor="area">Property area in sqft</label>
              <input
                {...register("propertyArea", {
                  required: "Area is required",
                  min: {
                    value: 200,
                    message: "min:200",
                  },
                  max: {
                    value: 2000000,
                    message: "max:2000000",
                  },
                })}
                type="number"
                name="propertyArea"
                id="propertyArea"
                placeholder="Enter area"
              />
              <p className={classes.Ierror}>{errors.propertyArea?.message}</p>

              <label htmlFor="lot">Lot Size in sqft</label>
              <input
                {...register("lotSize", {
                  required: "Lot size is required",
                  min: {
                    value: 200,
                    message: "min:200",
                  },
                  max: {
                    value: 2000000,
                    message: "max:2000000",
                  },
                })}
                type="number"
                name="lotSize"
                id="lotSize"
                placeholder="Enter lot size"
              />
              <p className={classes.Ierror}>{errors.lotSize?.message}</p>

              <label htmlFor="year">Year Built:</label>
              <input
                {...register("yearBuilt", {
                  required: "Year built is required!",
                  min: {
                    value: 1900,
                    message: "please enter valid year! min:1900",
                  },
                  max: {
                    value: 2023,
                    message: "please enter a valid year!",
                  },
                })}
                type="number"
                name="yearBuilt"
                id="yearBuilt"
                placeholder="Enter year built"
              />

              <p className={classes.Ierror}>{errors.yearBuilt?.message}</p>

              <label htmlFor="parking">Does your property have parking?</label>
              <select
                {...register("propertyParking", {
                  required: true,
                })}
                id="propertyParking"
                name="propertyParking"
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className={classes.propertyLocation}>
              <h3>Property Details</h3>

              <label htmlFor="locality">Locality</label>
              <input
                {...register("propertyLocality", {
                  required: "Locality is required",
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "please enter a valid locality",
                  },
                })}
                type="text"
                placeholder="Enter Locality"
                name="propertyLocality"
                id="propertyLocality"
                required
              />
              <p className={classes.Ierror}>
                {errors.propertyLocality?.message}
              </p>

              <label htmlFor="image">Property Images</label>
              <input
                {...register("propertyImages", {
                  required:
                    "Please upload at least one image of your property!",
                })}
                type="file"
                name="propertyImages"
                id="propertyImages"
                multiple="multiple"
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
              />
              <p className={classes.Ierror}>{errors.propertyImages?.message}</p>
              <p className={classes.Ierror}>
                {imgErr ? "you can only upload upto 3 images" : ""}
              </p>

              <label>Property Type</label>
              <select
                {...register("propertyType", {
                  required: true,
                })}
                name="propertyType"
                id="propertyType"
                required
              >
                <option value="Flat">Flat/Apartment</option>
                <option value="home">Residential Home</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="studioApartment">Studio Apartment</option>
                <option value="serviceApartment">Service Apartment</option>
                <option value="office">Commercial office Space</option>
                <option value="shop">Commercial Shop</option>
                <option value="showroom">Commercial Showroom</option>
                <option value="land">Commercial Land</option>
                <option value="warehouse">Warehouse/Godown</option>
                <option value="industrialBuilding">Industrial Building</option>
                <option value="agriculturalLand">Agricultural Land</option>
                <option value="farmhouse">Farm House</option>
              </select>

              <label htmlFor="beds">Please Enter the number of bedrooms:</label>
              <input
                {...register("bedsNum", {
                  required: "please enter the number of bedrooms",
                  min: {
                    value: 0,
                    message: "min : 0 bedrooms",
                  },
                  max: {
                    value: 50,
                    message: "you can only list upto 50 bedrooms",
                  },
                })}
                type="number"
                name="bedsNum"
                id="bedsNum"
              />
              <p className={classes.Ierror}>{errors.bedsNum?.message}</p>

              <label htmlFor="baths">
                Please Enter the number of washrooms:
              </label>
              <input
                {...register("bathsNum", {
                  required: "please enter the number of bathrooms",
                  min: {
                    value: 0,
                    message: "min : 0 bathrooms",
                  },
                  max: {
                    value: 50,
                    message: "you can only list upto 50 bathrooms",
                  },
                })}
                type="number"
                name="bathsNum"
                id="bathsNum"
              />
              <p className={classes.Ierror}>{errors.bathsNum?.message}</p>

              <label htmlFor="description">
                Please provide a description of your property:
              </label>
              <textarea
                {...register("propertyDescription", {
                  required: false,
                })}
                className={classes.tArea}
                name="propertyDescription"
                id="propertyDescription"
                cols="30"
                rows="5"
              />
            </div>
          </div>

          <div className={classes.formFooter}>
            <span>
              <input
                {...register("checkbox")}
                type="checkbox"
                name="terms"
                id="terms"
                required
              />{" "}
              I agree to the Terms and Conditions of PropertyWala
            </span>
            <button type="submit">List Property</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ListProperty;
