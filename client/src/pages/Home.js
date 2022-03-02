import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <Container className="d-flex p-2">
      <Jumbotron>
        <h1>C-est-la-vie</h1>
        <p>
          Welcome to C-est-la-vie, login or sign-up to add your journals and start your journey to self-care.
        </p>
        <p>
          <Button type="submit" variant="success" size="lg">
            <Link to="/login"> Login </Link>
          </Button>
          <Button type="submit" variant="success" size="lg">
            <Link to="/signup"> Signup </Link>
          </Button>
        </p>
      </Jumbotron>

    </Container>



  )
}

export default Home