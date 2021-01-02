import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup';

function Register({ display, setDisplay }) {
    const existing = ['test', '123123123', 'ryhuz']; // to remove once username check with node.js is done
    const [checkingUsername, setCheckingUsername] = useState(false)
    const thisModal = 'register';
    const otherModal = 'login';
    function changeModal() {
        setDisplay(thisModal, false)
        setDisplay(otherModal, true)
    }
    const initialForm = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstname: "",
        lastname: "",
    }
    const validation = {
        username: Yup.string().required().test('username-exists', 'username already taken', function (value) {
            setCheckingUsername(true);
            /* to replace with async check with node.js */
            if (existing.includes(value)) {
                setCheckingUsername(false);
                return false;
            } else {
                setCheckingUsername(false);
                return true;
            }
            /* ---------------------------------------- */
        }),
        password: Yup.string().required().min(8),
        confirmPassword: Yup.string().required('passwords must match').oneOf([Yup.ref('password'), null], 'passwords must match'),
        email: Yup.string().required().email(),
        firstname: Yup.string().required().min(2),
        lastname: Yup.string().required().min(2),
    }
    return (
        <Modal centered size='lg' show={display} onHide={() => setDisplay(thisModal, false)}>
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto">Register Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Formik initialValues={initialForm} validationSchema={Yup.object(validation)}
                    onSubmit={(values) => {
                        console.log(values)
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
                                            isInvalid={touched.username && errors.username && !checkingUsername} isValid={touched.username && !errors.username && !checkingUsername}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        {!checkingUsername &&
                                            <ErrorMessage name="username" component="div" className="text-danger" />
                                        }
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
                                <Button variant="secondary" onClick={handleSubmit}>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    Already have an account? Log in <span onClick={changeModal}>here</span>
                </div>
            </Modal.Footer>
        </Modal >
    )
}

export default Register
