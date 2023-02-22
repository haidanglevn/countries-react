import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-title">
          <h1>A WHOLE WORLD IS IN YOUR HAND</h1>
          <h2>
            One click to get all the information of the countries you love.
          </h2>
          <Button variant="primary"><Link to={"/countries"}>Get Started</Link> </Button>
        </div>
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@patricktkindt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Patrick T'Kindt
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/N2p_1LIb5zg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </div>
    </div>
  );
};

export default Home;
{
  /* <span>Countries app </span>is a simple React application made in
        Business College Helsinki lessons. App uses{' '}
        <a href="https://restcountries.com/">https://restcountries.com/ </a> and{' '}
        <a href="https://openweathermap.org/">https://openweathermap.org/</a> */
}
