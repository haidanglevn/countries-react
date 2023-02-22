import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../auth/firebase";

const Layout = () => {
  const [user] = useAuthState(auth);
  const showUser = () => {
    if (user) {
      return user.email;
    }
  };
  const showLogInAndRegister = () => {
    if (!user) {
      return (
        <Nav>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/countries">
            <Nav.Link>Countries</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favorites">
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/register">
            <Nav.Link>Register</Nav.Link>
          </LinkContainer>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/countries">
            <Nav.Link>Countries</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/favorites">
            <Nav.Link>Favorites</Nav.Link>
          </LinkContainer>
        </Nav>
      );
    }
  };

  const showLogOut = () => {
    if (user) {
      return (
        <div
          style={{
            display: "flex",
            alignItems:"center" ,
            justifyContent: "space-between",
            gap:"10px",
            color: "white"
          }}
        >
          Welcome, {showUser()} <br />
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      );
    }
  }

  return (
    <Container fluid>
      <Row>
        <Navbar bg="dark" variant="dark">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {showLogInAndRegister()}
            </Navbar.Collapse>
            {showLogOut()}
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
