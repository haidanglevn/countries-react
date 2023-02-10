import React, { useState } from "react";
import axios from "axios";
import { Container, Spinner, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState("");
  const params = useParams();
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(true);

  /* const fetchWeather = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res);
        setWeather(res.data);
      });
  }; */

  useEffect(() => {
    let search = params.single;
    let searchUrl = `https://restcountries.com/v3.1/name/${search}?fullText=true`;
    axios.get(searchUrl).then((res) => {
      setTimeout(() => {
        setCountry(res.data[0]);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
          )
          .then((response) => {
            console.log(response);
            setWeather(response.data);
          });
        setLoading(false);
      }, 1000);
    });
  }, []);

  /*  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        console.log(res);
        setWeather(res.data);
      });
  }, [country]); */
  console.log(process.env.REACT_APP_API_KEY);

  const renderApp = () => {
    console.log("country: ", country);
    if (loading == true) {
      console.log(`page is loading`);
      return (
        <Col style={{ width: "100%", padding: "50px 0" }}>
          <div className="d-flex justify-content-center">
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            <div>
              <p>Loading, please wait....</p>
            </div>
          </div>
        </Col>
      );
    }
    if (loading == false) {
      return (
        <div>
          <h1>{country.name.common}</h1>
          <h3>{country.name.official}</h3>
          <img
            src={country.flags.svg}
            style={{
              objectFit: "cover",
              maxHeight: "200px",
              minHeight: "150px",
            }}
          />
          <p>
            Languages: {` ${Object.values(country.languages || {}).join(", ")}`}
          </p>
          <p>
            Currencies:{" "}
            {` ${Object.values(country.currencies)
              .map((currency) => currency.name)
              .join(", ")}`}
          </p>
          <p>
            Population:{" "}
            {` ${new Intl.NumberFormat().format(country.population)}`}
          </p>
          <p>Capital: {country.capital} </p>
          <img
            src={`https://source.unsplash.com/featured/1600x900?${country.capital}`}
            style={{
              objectFit: "cover",
              maxHeight: "200px",
              minHeight: "150px",
            }}
            alt=""
          />
          <p>{weather.cod}</p>
          <div>
            <Button variant="light">
              <Link to={"/countries"}>Back to all countries</Link>
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <Container style={{ backgroundColor: "lightgray" }}>
      {renderApp()}
    </Container>
  );
};

export default CountriesSingle;
