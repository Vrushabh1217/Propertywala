import React, { useEffect, useState } from "react";
import classes from "../assets/Styles/properties.module.css";
import PropertyCard from "../components/PropertyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useLoaderData, useParams } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const ShowProperties = () => {
  const { purpose, homeQuery } = useParams();
  const [type, setType] = useState(purpose);
  const p = useLoaderData();

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setType(purpose);
    const typeProperties = p.filter((property) => property.purpose == type);
    setProperties(typeProperties);
  }, [purpose, type]);

  //states for search and filters
  const [query, setQuery] = React.useState(homeQuery || "");
  const [bedrooms, setBedrooms] = React.useState(false);
  const [Ptype, setPtype] = React.useState(false);
  const [Psort, setPsort] = React.useState(false);

  const handleSearch = (e) => {
    const search = e.target.value;
    setQuery(search);
  };

  const querySearch = async () => {
    const queryProperties = await p.filter((property) => {
      return (
        (property.name.toLowerCase().includes(query.trim().toLowerCase()) ||
          property.location
            .toLowerCase()
            .includes(query.trim().toLowerCase()) ||
          property.locality
            .toLowerCase()
            .includes(query.trim().toLowerCase())) &&
        property.purpose == type
      );
    });
    setProperties(queryProperties);
  };

  const handleBedsChange = (event) => {
    setBedrooms(event.target.value);
  };

  const handleTypeChange = (event) => {
    setPtype(event.target.value);
  };

  const handleSortChange = (event) => {
    setPsort(event.target.value);
  };

  const applyFilters = async () => {
    let filteredProperties = p;

    if (bedrooms !== false) {
      filteredProperties = filteredProperties.filter(
        (property) => property.bedsNum === bedrooms
      );
    }

    if (Ptype !== false) {
      filteredProperties = filteredProperties.filter(
        (property) => property.propertyType === Ptype
      );
    }

    if (Psort === "lh") {
      filteredProperties.sort((p1, p2) => p1.price - p2.price);
    } else if (Psort === "hl") {
      filteredProperties.sort((p1, p2) => p2.price - p1.price);
    }

    setProperties(filteredProperties);
  };

  const resetProperties = () => {
    setProperties(p.filter((property) => property.purpose == type));
    setQuery("");
    setBedrooms(false);
    setPsort(false);
    setPtype(false);
  };

  return (
    <main className={classes.spMain}>
      <header>
        <div className={classes.headerClass}>
          <h1>Browse Properties</h1>
          <p>
            {properties.length} properties available for {type}
          </p>
        </div>
      </header>

      <div className={classes.searchBar}>
        <input
          type="text"
          placeholder="Find properties..."
          value={query}
          onChange={handleSearch}
        ></input>
        <Button variant="contained" onClick={querySearch}>
          <SearchIcon size="large" />
        </Button>
      </div>

      <div className={classes.propertyFilters}>
        <FormControl size="small" style={{ minWidth: "10rem" }}>
          <InputLabel id="demo-simple-select-label">Bedrooms</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bedrooms}
            label="bedrooms"
            onChange={handleBedsChange}
          >
            <MenuItem value={1}>1 Bedroom</MenuItem>
            <MenuItem value={2}>2 Bedroom</MenuItem>
            <MenuItem value={3}>3 Bedroom</MenuItem>
            <MenuItem value={4}>4 Bedroom</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" style={{ minWidth: "10rem" }}>
          <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Ptype}
            label="propertyType"
            onChange={handleTypeChange}
          >
            <MenuItem value={"Flat"}>Flat/Apartment</MenuItem>
            <MenuItem value={"villa"}>Villa</MenuItem>
            <MenuItem value={"penthouse"}>Penthouse</MenuItem>
            <MenuItem value={"office"}>Commercial office Space</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" style={{ minWidth: "10rem" }}>
          <InputLabel id="demo-simple-select-label">Sort by price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={Psort}
            label="price"
            onChange={handleSortChange}
          >
            <MenuItem value={"lh"}>Low to high</MenuItem>
            <MenuItem value={"hl"}>high to low</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          style={{ backgroundColor: "#7164f0" }}
          onClick={applyFilters}
        >
          Apply{" "}
        </Button>
        <Button
          variant="outlined"
          style={{ color: "#7164f0", borderColor: "#7164f0" }}
          onClick={resetProperties}
        >
          reset{" "}
        </Button>
      </div>

      <section className={classes.propertiesContainer}>
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </section>
    </main>
  );
};

export default ShowProperties;
