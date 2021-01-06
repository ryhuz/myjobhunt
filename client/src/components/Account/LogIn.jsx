import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { axiosBase } from '../../https_requests/requests'
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { successfulLogin } from '../../app/loginSlice'
import jwt_decode from "jwt-decode";

function LogIn({ display, setDisplay, changeModal }) {
    const dispatch = useDispatch();

    const thisModal = 'login';
    const otherModal = 'register';
    const [loggedIn, setLoggedIn] = useState(false)
    const [loginErr, setLoginErr] = useState("");

    const initialForm = {
        username: "",
        password: "",
    }
    const validation = {
        username: Yup.string().required(),
        password: Yup.string().required().min(8),
    }
    async function login(form) {
        try {
            let loginAttempt = await axiosBase.post('/login', form)
            setLoginErr("")
            let token = loginAttempt.data.token
            localStorage.setItem('mjh_user_token', loginAttempt.data.token);
            let deToken = jwt_decode(token)
            dispatch(successfulLogin(deToken.data.ref))
            setDisplay(thisModal, false)
            setLoggedIn(true);
        } catch (e) {
            // console.log(e)
            if (e.response.data.invalid === 'username') {
                setLoginErr("Username does not exist")
            }
            if (e.response.data.invalid === 'password') {
                setLoginErr("Invalid password")
            }
        }
    }
    if (loggedIn) { return <Redirect to="/dashboard" /> }
    return (
        <Modal centered size='lg' show={display} onHide={() => setDisplay(thisModal, false)}>
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto">Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialForm} validationSchema={Yup.object(validation)}
                    onSubmit={(values) => {
                        login(values);
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
                                    {loginErr &&
                                        <Form.Group controlId="err.message">
                                            <div className="text-danger"><b>{loginErr}</b></div>
                                        </Form.Group>
                                    }
                                    <Form.Group controlId="register.username">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control type="text" name="username" value={values.username}
                                            isInvalid={touched.username && errors.username} isValid={touched.username && !errors.username}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <ErrorMessage name="username" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group controlId="register.password">
                                        <Form.Label>password</Form.Label>
                                        <Form.Control type="password" name="password" value={values.password}
                                            isInvalid={touched.password && errors.password} isValid={touched.password && !errors.password}
                                            onChange={handleChange} onBlur={handleBlur} onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSubmit();
                                                }
                                            }} />
                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col md={8} className="my-3">
                                <Button variant="secondary" type="submit" onClick={handleSubmit} /*disabled={isSubmitting}*/>
                                    Log In
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    Don't have an account? Register one <span onClick={() => changeModal(thisModal, otherModal)}>here</span>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default LogIn
