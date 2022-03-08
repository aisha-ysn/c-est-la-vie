import React from "react";
import {
  Container,
  Button,
} from "react-bootstrap";
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <Container className="d-flex p-2">
      <div className="container-fluid bg-light text-dark p-5">
        <div className="container bg-light p-5">
          <h1 className="display-4 fw-bold">C-est-la-vie</h1>
          <p>Welcome to C-est-la-vie, login or sign-up to add your journals and start your journey to self-care.</p>
          <p>
            <Button className="m-3 p-3" type="submit" variant="primary" size="lg">
              <Link className="text-light" to="/login"> Login </Link>
            </Button>
            <Button className="m-3 p-3" type="submit" variant="primary" size="lg">
              <Link className="text-light" to="/signup"> Signup </Link>
            </Button>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default Home