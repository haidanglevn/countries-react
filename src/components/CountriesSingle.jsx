import React, { useState } from "react";
import axios from "axios";
import { Container, Spinner, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CountriesSingle.scss";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../features/countries/favoritesSlice";

const CountriesSingle = () => {
  const dispatch = useDispatch();
  const favoritesList = useSelector((state) => state.favorites.favorites);
  const location = useLocation();
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const country = location.state.country;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, []);

  const dispatchHandler = (countryName, action) => {
    switch (action) {
      case "add":
        dispatch(addFavorite(countryName));
        toast.success(`Successfully added ${countryName} into favorites`);
        break;
      case "remove":
        dispatch(removeFavorite(countryName));
        toast.success(`Successfully removed ${countryName} from favorites`);
        break;
      default:
        break;
    }
  };
  console.log("Weather: ", weather);
  const renderApp = () => {
    console.log("country: ", country);
    if (loading == true) {
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
        <div className="App country-single">
          <div className="info">
            <h1>{country.name.common}</h1>
            <h3>{country.name.official}</h3>
            <img
              src={country.flags.svg}
              style={{
                objectFit: "cover",
                maxHeight: "200px",
                minHeight: "150px",
                margin: "20px 0",
              }}
            />
            <div>
              {favoritesList.includes(country.name.common) ? (
                <Button
                  variant="success"
                  onClick={() => dispatchHandler(country.name.common, "remove")}
                >
                  Added to favorites <i className="bi bi-heart-fill"></i>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => dispatchHandler(country.name.common, "add")}
                >
                  Add to favorites <i className="bi bi-heart"></i>
                </Button>
              )}
            </div>
            <div className="info-details">
              <table>
                <tr>
                  <td>Area</td>
                  <td>
                    {` ${new Intl.NumberFormat().format(country.area)}`} km²
                  </td>
                </tr>
                <tr>
                  <td>Continent(s)</td>
                  <td>{country.continents[0]}</td>
                </tr>
                <tr>
                  <td>Borders</td>
                  <td>
                    {` ${Object.values(country.borders || {}).join(", ")}`}
                  </td>
                </tr>
                <tr>
                  <td>Languages</td>
                  <td>
                    {` ${Object.values(country.languages || {}).join(", ")}`}
                  </td>
                </tr>
                <tr>
                  <td>Currencies</td>
                  <td>
                    {` ${Object.values(country.currencies)
                      .map((currency) => currency.name)
                      .join(", ")}`}{" "}
                  </td>
                </tr>
                <tr>
                  <td>Population</td>
                  <td>
                    {` ${new Intl.NumberFormat().format(country.population)}`}
                  </td>
                </tr>
                <tr>
                  <td>Time zone(s)</td>
                  <td>
                    {` ${Object.values(country.timezones || {}).join(", ")}`}
                  </td>
                </tr>
              </table>
              <Button variant="light">
                <Link to={"/countries"}>Back to all countries</Link>
              </Button>
            </div>
          </div>
          <div
            className="weather"
            style={{
              backgroundImage: `url("https://source.unsplash.com/featured/1600x900?${weather.weather[0].main}")`,
            }}
          >
            {!error && weather && (
              <div>
                <h2>{country.capital[0].toUpperCase()} </h2>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <h1>{parseInt(weather.main.temp)}°</h1>
                <p>{weather.weather[0].description.toUpperCase()}</p>
                <div className="detail-temp">
                  <div>
                    <p>
                      MIN <br /> TEMP
                    </p>
                    <p>{parseInt(weather.main.temp_min)}°</p>
                  </div>
                  <div>
                    <p>
                      MAX <br /> TEMP
                    </p>
                    <p>{parseInt(weather.main.temp_max)}°</p>
                  </div>
                  <div>
                    <p>
                      FEELS <br /> LIKE
                    </p>
                    <p>{parseInt(weather.main.feels_like)}°</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return <>{renderApp()}</>;
};

export default CountriesSingle;
