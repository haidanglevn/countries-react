import React, { useState } from "react";
import { useEffect } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Spinner } from "react-bootstrap";
import { initializeCountries } from "../features/countries/countriesSlice";
import { addFavorite } from "../features/countries/favoriteSlice";


const Countries = () => {
  const dispatch = useDispatch();
  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");
  const favoritesList2= useSelector((state)=> state.favorites.favorites)
  const favoritesList = localStorage.getItem("Favorites");
  console.log("Favorites" ,favoritesList )

  //  console.log("Search: ", search)
  console.log(countriesList);
  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);
  
  useEffect(()=> {

  },[])
  
  const renderApp = () => {
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
    } else {
      console.log(`Loading done!`);
      return countriesList
        .filter((c) => {
          return c.name.official.toLowerCase().includes(search.toLowerCase());
        })
        .map((country) => {
          return (
            <Col className="mt-5" key={country.name.common}>
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              >
                <Card className="h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Img
                      src={country.flags.svg}
                      style={{
                        objectFit: "cover",
                        height: "200px",
                      }}
                    ></Card.Img>
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
                          <button>
                            <i
                              className="bi bi-heart-fill"
                              onClick={() =>
                                dispatch(addFavorite(country.name.common))
                              }
                            ></i>
                          </button>
                        ) : (
                          <button>
                            <i
                              className="bi bi-heart"
                              onClick={() =>
                                dispatch(addFavorite(country.name.common))
                              }
                            ></i>
                          </button>
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
              </LinkContainer>
            </Col>
          );
        });
    }
  };

  return (
    <Container fluid>
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
    </Container>
  );
};

export default Countries;
