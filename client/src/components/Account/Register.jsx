import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { successfulLogin } from '../../app/loginSlice'
import { storeUser } from '../../app/userDetailSlice'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import debounce from 'lodash.debounce';
import { register, login } from './LoginFunctions';
import { axiosBase } from '../../https_requests/requests'

function Register({ display, setDisplay, changeModal }) {
    const dispatch = useDispatch();
    const thisModal = 'register';
    const otherModal = 'login';
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingExists, setCheckingExists] = useState({ username: false, email: false });
    const [exists, setExists] = useState({ username: false, email: false });

    async function checkExists(data, type) {
        try {
            let check = await axiosBase.put('checkexist', { data, type });
            if (check.data.exists) {
                setExists({ ...exists, [type]: true, });

                setCheckingExists({ ...checkingExists, [type]: true, });
                return true;
            } else {
                setExists({ ...exists, [type]: false, });
                setCheckingExists({ ...checkingExists, [type]: false, });
                return false;
            }
        } catch (e) {
            console.log(e.response);
            setCheckingExists({ ...exists, [type]: false, });
        }
    }
    const debouncedCheck = useCallback(debounce((username, type) => checkExists(username, type), 800), []);

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

    function handleRegister(form, setSubmitting) {
        register(form)
            .then(attemptRegister => {
                if (attemptRegister.success) {
                    login(form)
                        .then(attemptLogin => {
                            if (attemptLogin.success) {
                                /* Update store with user details and token */
                                dispatch(storeUser(attemptLogin.user))
                                dispatch(successfulLogin(attemptLogin.token))

                                /* Reset register modal form */
                                setSubmitting(false);
                                setDisplay(thisModal, false)

                                /* Redirect to dashboard */
                                setLoggedIn(true);
                            } else {
                                /* Login failed */
                                setSubmitting(false);
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })
                } else {
                    /* Whatever if registration failed */
                    // setSubmitting(false)
                    // show error message
                }
            })
            .catch(e => {
                console.log(e)
            })
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
                        handleRegister(values, setSubmitting);
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
                                        <Form.Control type="text" name="username" value={values.username} className={`${checkingExists.username ? 'is-loading' : ''}`}
                                            isInvalid={(touched.username && errors.username && !checkingExists.username) || exists.username} isValid={touched.username && !errors.username && !checkingExists.username && !exists.username}
                                            onChange={e => {
                                                handleChange(e);
                                                setExists({
                                                    ...exists,
                                                    username: false,
                                                });
                                                if (e.target.value.length > 3) {
                                                    setCheckingExists({
                                                        ...checkingExists,
                                                        username: true,
                                                    })
                                                    debouncedCheck(e.target.value, 'username');
                                                }
                                            }} onBlur={handleBlur} />
                                        {!checkingExists.username &&
                                            <ErrorMessage name="username" component="div" className="text-danger" />
                                        }
                                        {exists.username &&
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
                                        <Form.Control type="text" name="email" value={values.email} className={`${checkingExists.username ? 'is-loading' : ''}`}
                                            isInvalid={(touched.email && errors.email && !checkingExists.email) || exists.email} isValid={touched.email && !errors.email && !checkingExists.email && !exists.email}
                                            onChange={e => {
                                                handleChange(e);
                                                setExists({
                                                    ...exists,
                                                    email: false,
                                                });
                                                if (e.target.value.length > 3) {
                                                    setCheckingExists({
                                                        ...checkingExists,
                                                        email: true,
                                                    })
                                                    debouncedCheck(e.target.value, 'email');
                                                }
                                            }} onBlur={handleBlur} />
                                        {!checkingExists.email &&
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        }
                                        {exists.email &&
                                            <div className="text-danger">email already exists</div>}
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
