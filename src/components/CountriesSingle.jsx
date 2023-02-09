import React, { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CountriesSingle = () => {
  const params = useParams();
  const [country, setCountry] = useState([]);

  useEffect(() => {
    let search = params.single;
    let searchUrl = `https://restcountries.com/v3.1/name/${search}?fullText=true`;
    axios.get(searchUrl).then((res) => {
      setCountry(res.data);
    });
  }, []);

  const renderApp = () => {
    console.log(country);
    if (country.length) {
      return (
        <div>
          <h1>{country[0].name.common}</h1>
          <h3>{country[0].name.official}</h3>
          <img
            src={country[0].flags.svg}
            style={{
              objectFit: "cover",
              maxHeight: "200px",
              minHeight: "150px",
            }}
          />
          <p>
            Languages:{" "}
            {` ${Object.values(country[0].languages || {}).join(", ")}`}
          </p>
          <p>
            Currencies:{" "}
            {` ${Object.values(country[0].currencies)
              .map((currency) => currency.name)
              .join(", ")}`}
          </p>
          <p>
            Population:{" "}
            {` ${new Intl.NumberFormat().format(country[0].population)}`}
          </p>
        </div>
      );
    }
  };

  return (
    <Container style={{backgroundColor:"lightgray"}}>
      <div>Single Country will be here</div>
      {renderApp()}
      <Link to={"/countries"}>Back to all countries</Link>
    </Container>
  );
};

export default CountriesSingle;
