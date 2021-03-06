// see SignupForm.js for comments
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import '../assets/css/home.css';


import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  let location = useLocation();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    console.log(event)
    event.preventDefault();
    console.log(userFormData)
    console.log(event)
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    ;
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      ;
      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const { token, user } = await response.json();
      console.log(data)
      Auth.login(data.login.token);
      // if (Auth.loggedIn()) {
      //   return <Navigate to="/entries" state={{ from: location }} replace />;
      // }
      // window.location.replace("/entries")

    } catch (err) {
      console.error(error);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={(e) => handleFormSubmit(e)}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;

