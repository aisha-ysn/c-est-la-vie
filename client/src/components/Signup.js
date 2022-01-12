import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/login+signup.css'
import uiImg from '../components/images/Information.png'

import { createUser } from '../utils/API';
import Auth from '../utils/auth';


const SignUpForm = () => {

    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

    const [validated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);

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
            const { data } = await createUser({
                variables: { ...userFormData }
            });

            Auth.login(data.addUser.token);
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
                    Something went wrong with your signup!
                </Alert>

                <form id="back">
                    <form id="box">
                        <div className="form-inner">

                            <h2>Sign Up</h2>
                            <Form.Group>
                                <div className="form">
                                    <input type="username" name="username" id="username" placeholder="Your Username" onChange={handleInputChange}
                                        value={userFormData.username}
                                        required />
                                </div>
                                <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                            </Form.Group>

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

                            <input type="password" name="password" id="password" placeholder=" Enter Password" onChange={handleInputChange}
                                value={userFormData.password} required />
                        </div>
                        <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                    </Form.Group>

                    <input disabled={!(userFormData.username && userFormData.email && userFormData.password)} type="submit" value="Join" id="button" />

                    <div>
                        {<img className="w-100" src={uiImg} alt="Sign Up page" />}
                    </div>

                </form>
            </Form>
        </>
    );
};

export default SignUpForm;