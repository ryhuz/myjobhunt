import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { successfulLogin } from '../../app/loginSlice'
import { storeUser } from '../../app/userDetailSlice'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { axiosBase } from '../../https_requests/requests'
import debounce from 'lodash.debounce';
import jwt_decode from "jwt-decode";

function Register({ display, setDisplay, changeModal }) {
    const dispatch = useDispatch();
    const thisModal = 'register';
    const otherModal = 'login';
    const [loggedIn, setLoggedIn] = useState(false)

    async function checkExists(username) {
        try {
            let check = await axiosBase.put('checkexist', { username });
            if (check.data.exists) {
                setUsernameExists(true);
                setCheckingUsername(false);
                return true;
            } else {
                setUsernameExists(false);
                setCheckingUsername(false);
                return false;
            }
        } catch (e) {
            console.log(e.response);
            setCheckingUsername(false);
        }
    }
    const debouncedCheck = useCallback(debounce((username, err) => checkExists(username, err), 800), []);

    const [checkingUsername, setCheckingUsername] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    const initialForm = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstname: "",
        lastname: "",
    }
    const validation = {
        username: Yup.string().required().min(4),
        password: Yup.string().required().min(8),
        confirmPassword: Yup.string().required('passwords must match').oneOf([Yup.ref('password'), null], 'passwords must match'),
        email: Yup.string().required().email(),
        firstname: Yup.string().required().min(2),
        lastname: Yup.string().required().min(2),
    }
    async function login(form, setSubmitting) {
        try {
            let loginAttempt = await axiosBase.post('/login', form)
            let token = loginAttempt.data.token
            localStorage.setItem('mjh_user_token', token);
            let deToken = jwt_decode(token)

            dispatch(storeUser(loginAttempt.data.user))
            dispatch(successfulLogin(deToken.data.ref))

            setDisplay(thisModal, false)
            setSubmitting(false);
            setLoggedIn(true);
        } catch (e) {
        }
    }
    async function register(form, setSubmitting) {
        try {
            let register = await axiosBase.post('register', form);
            login(form, setSubmitting);
        } catch (e) {
            console.log(e.response)
        }
    }

    if (loggedIn) { return <Redirect to="/dashboard" /> }
    return (
        <Modal centered size='lg' show={display} onHide={() => setDisplay(thisModal, false)}>
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto">Register Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialForm} validationSchema={Yup.object(validation)}
                    onSubmit={(values, { setSubmitting }) => {
                        register(values, setSubmitting);
                    }} >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Form>
                                    <Form.Group controlId="register.username">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control type="text" name="username" value={values.username} className={`${checkingUsername ? 'is-loading' : ''}`}
                                            isInvalid={(touched.username && errors.username && !checkingUsername) || usernameExists} isValid={touched.username && !errors.username && !checkingUsername && !usernameExists}
                                            onChange={e => {
                                                handleChange(e);
                                                setUsernameExists(false);
                                                if (e.target.value.length > 3) {
                                                    setCheckingUsername(true);
                                                    debouncedCheck(e.target.value);
                                                }
                                            }} onBlur={handleBlur} />
                                        {!checkingUsername &&
                                            <ErrorMessage name="username" component="div" className="text-danger" />
                                        }
                                        {usernameExists &&
                                            <div className="text-danger">username already exists</div>}
                                    </Form.Group>
                                    <Form.Group controlId="register.password">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="password" name="password" value={values.password}
                                            isInvalid={touched.password && errors.password} isValid={touched.password && !errors.password}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group controlId="register.confirmPassword">
                                        <Form.Label>confirm password</Form.Label>
                                        <Form.Control type="password" name="confirmPassword" value={values.confirmPassword}
                                            isInvalid={touched.confirmPassword && errors.confirmPassword} isValid={touched.confirmPassword && !errors.confirmPassword}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group controlId="register.email">
                                        <Form.Label>email address</Form.Label>
                                        <Form.Control type="text" name="email" value={values.email}
                                            isInvalid={touched.email && errors.email} isValid={touched.email && !errors.email}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="register.firstname">
                                                <Form.Label>first name</Form.Label>
                                                <Form.Control type="text" name="firstname" value={values.firstname}
                                                    isInvalid={touched.firstname && errors.firstname} isValid={touched.firstname && !errors.firstname}
                                                    onChange={handleChange} onBlur={handleBlur} />
                                                <ErrorMessage name="firstname" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="register.lastname">
                                                <Form.Label>last name</Form.Label>
                                                <Form.Control type="text" name="lastname" value={values.lastname}
                                                    isInvalid={touched.lastname && errors.lastname} isValid={touched.lastname && !errors.lastname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                <ErrorMessage name="lastname" component="div" className="text-danger" />
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Col>
                            <Col md={8} className="my-3">
                                <Button variant="secondary" onClick={handleSubmit} disabled={isSubmitting}>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    Already have an account? Log in <span onClick={() => changeModal(thisModal, otherModal)}>here</span>
                </div>
            </Modal.Footer>
        </Modal >
    )
}

export default Register
