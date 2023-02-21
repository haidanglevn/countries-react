import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../features/countries/countriesSlice";
import {
  addFavorite,
  removeFavorite,
} from "../features/countries/favoritesSlice";
import SkeletonLoading from "./SkeletonLoading";

const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");
  const favoritesList = useSelector((state) => state.favorites.favorites);
  console.log("Favorites list in country", favoritesList);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  const renderApp = () => {
    if (loading === true) {
      console.log(`page is loading`);
      return <SkeletonLoading />;
    } else {
      console.log(`Loading done!`);
      return countriesList
        .filter((c) => {
          return c.name.official.toLowerCase().includes(search.toLowerCase());
        })
        .map((country) => {
          return (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100">
                <Card.Body className="d-flex flex-column">
                  <LinkContainer
                    to={`/countries/${country.name.common}`}
                    state={{ country: country }}
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      cursor: "pointer",
                    }}
                  >
                    <Card.Img src={country.flags.svg}></Card.Img>
                  </LinkContainer>

                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      {favoritesList.includes(country.name.common) ? (
                        <Button
                          variant="success"
                          onClick={() =>
                            dispatch(removeFavorite(country.name.common))
                          }
                        >
                          Added to favorites{" "}
                          <i className="bi bi-heart-fill"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() =>
                            dispatch(addFavorite(country.name.common))
                          }
                        >
                          Add to favorites <i className="bi bi-heart"></i>
                        </Button>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2">
                        {` ${Object.values(country.languages || {}).join(
                          ", "
                        )}`}
                        {/* Martin way */}
                      </i>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2">
                        {country.currencies
                          ? ` ${Object.values(country.currencies)
                              .map((currency) => currency.name)
                              .join(", ")}`
                          : `-------`}{" "}
                        {/* Lera way */}
                      </i>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <i className="bi bi-people me-2">
                        {` ${new Intl.NumberFormat().format(
                          country.population
                        )}`}
                      </i>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          );
        });
    }
  };

  return (
    <Container fluid className="App">
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: "18rem" }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {renderApp()}
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Countries;
