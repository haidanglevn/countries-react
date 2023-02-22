import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Col, Row } from "react-bootstrap";
import "./SkeletonLoading.css";
const SkeletonLoading = () => {
  return (
    <div className="skeleton-container">
      <Card className="skeleton-card">
        <Card.Body>
          <Card.Img
            style={{
              objectFit: "cover",
              height: "200px",
            }}
            className="skeleton"
          ></Card.Img>
          <Card.Title className="mt-2 skeleton skeleton-text"></Card.Title>
          <Card.Subtitle className="mb-5 skeleton skeleton-text"></Card.Subtitle>
          <ListGroup
            variant="flush"
          >
            <ListGroup.Item>
              <div variant="success" className="skeleton skeleton-button"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <div className="mt-2 skeleton skeleton-list"></div>
          </ListGroup>
        </Card.Body>
      </Card>
      <Card className="skeleton-card">
        <Card.Body>
          <Card.Img
            style={{
              objectFit: "cover",
              height: "200px",
            }}
            className="skeleton"
          ></Card.Img>
          <Card.Title className="mt-2 skeleton skeleton-text"></Card.Title>
          <Card.Subtitle className="mb-5 skeleton skeleton-text"></Card.Subtitle>
          <ListGroup
            variant="flush"
          >
            <ListGroup.Item>
              <div variant="success" className="skeleton skeleton-button"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <div className="mt-2 skeleton skeleton-list"></div>
          </ListGroup>
        </Card.Body>
      </Card>
      <Card className="skeleton-card">
        <Card.Body>
          <Card.Img
            style={{
              objectFit: "cover",
              height: "200px",
            }}
            className="skeleton"
          ></Card.Img>
          <Card.Title className="mt-2 skeleton skeleton-text"></Card.Title>
          <Card.Subtitle className="mb-5 skeleton skeleton-text"></Card.Subtitle>
          <ListGroup
            variant="flush"
          >
            <ListGroup.Item>
              <div variant="success" className="skeleton skeleton-button"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <div className="mt-2 skeleton skeleton-list"></div>
          </ListGroup>
        </Card.Body>
      </Card>
      <Card className="skeleton-card">
        <Card.Body>
          <Card.Img
            style={{
              objectFit: "cover",
              height: "200px",
            }}
            className="skeleton"
          ></Card.Img>
          <Card.Title className="mt-2 skeleton skeleton-text"></Card.Title>
          <Card.Subtitle className="mb-5 skeleton skeleton-text"></Card.Subtitle>
          <ListGroup
            variant="flush"
          >
            <ListGroup.Item>
              <div variant="success" className="skeleton skeleton-button"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="skeleton skeleton-list"></div>
            </ListGroup.Item>
            <div className="mt-2 skeleton skeleton-list"></div>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SkeletonLoading;
