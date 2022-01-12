import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';

import '../assets/css/login+signup.css'
import icon from '../images/Icon.png'
import uiImg from '../images/Login.png'



const LoginForm = (props) => {

    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loginUser] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await loginUser({
                variables: { ...userFormData }
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };


    return (
        <>

            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                </Alert>

                <form id="back">
                    <form id="box">
                        <div className="form-inner">
                            <div id="icon">
                                <img className="icon-img" src={loginIcon} alt="icon" id="icon" />
                            </div>
                        </div>
                    </form>

                    <Form.Group>
                        <div className="form">
                            <input type="email" name="email" id="email" placeholder="Enter Email" onChange={handleInputChange} value={userFormData.email} required />
                        </div>
                        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <div className="form">
                            <input type="password" name="password" id="password" placeholder="******" onChange={handleInputChange} value={userFormData.password} required />
                        </div>
                        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback> </Form.Group>

                    <input disabled={!(userFormData.username && userFormData.email && userFormData.password)} type="submit" value="Join" id="button" />

                    <div>
                        {<img className="w-100" src={uiImg} alt="login page" variant='success' />}
                    </div>


                </form>
            </Form>
        </>

    );
};

export default LoginForm;