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
import { initializeCountries } from "../features/countries/countriesSlice";

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  //  console.log("Search: ", search)
  console.log(countriesList);
  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

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
        {countriesList
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
                          maxHeight: "200px",
                          minHeight: "150px",
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
                          <i className="bi bi-translate me-2">
                            {Object.values(country.languages || {}).join(", ")}
                            {/* Martin way */}
                          </i>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <i className="bi bi-cash-coin me-2">
                            {country.currencies
                              ? Object.values(country.currencies)
                                  .map((currency) => currency.name)
                                  .join(", ")
                              : `-------`}{" "}
                            {/* Lera way */}
                          </i>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <i className="bi bi-people me-2">
                            {new Intl.NumberFormat().format(country.population)}
                          </i>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </LinkContainer>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default Countries;
