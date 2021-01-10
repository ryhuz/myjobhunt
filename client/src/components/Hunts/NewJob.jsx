import React from 'react'
import { ErrorMessage, Formik } from 'formik';
import { useDispatch } from 'react-redux'

import { Col, Form, Modal, Row, Button, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';

import { axiosJobs } from '../../https_requests/requests';

function NewJob({ show, hide }) {
    const dispatch = useDispatch();

    const initialForm = {
        title: "",
        company: "",
        jd: "",
        jd_link: "",
        submit_medium: "",
    }

    const validation = {
        huntTitle: Yup.string().required().min(5, "why not give it a longer title?"),
        huntDesc: Yup.string().required().min(5, "why not give it a better description?"),
        huntExpire: Yup.number().required("You need to search for at least 1 month!").min(1, "You need to search for at least 1 month!").max(12, "The maximum you can keep a hunt going is 1 year. This is to encourage regular evalutaions of your job hunt!"),
    }

    async function addNewJob(form, setSubmitting) {

    }

    return (
        <Modal centered show={show} onHide={hide} size="xl">
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto">Add Job Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialForm} validationSchema={Yup.object(validation)}
                    onSubmit={(values, { setSubmitting }) => {
                        addNewJob(values, setSubmitting)
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
                            <Col md={11}>
                                <Form>
                                    {/* {loginErr &&
                                        <Form.Group controlId="err.message">
                                            <div className="text-danger"><b>{loginErr}</b></div>
                                        </Form.Group>
                                    } */}
                                    <Form.Group controlId="newJob.title">
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control type="text" name="title" value={values.title}
                                            isInvalid={touched.title && errors.title}
                                            onChange={handleChange} onBlur={handleBlur}/>
                                        <ErrorMessage name="title" component="div" className="text-danger" />
                                    </Form.Group>
                                    {/* <Form.Group controlId="newHunt.huntDesc">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" maxLength={MAX_DESC_LENGTH} name="huntDesc" value={values.huntDesc}
                                            isInvalid={touched.huntDesc && errors.huntDesc}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <div className="d-flex justifiy-content-between">
                                            <ErrorMessage name="huntDesc" component="div" className="text-danger" />
                                            {values.huntDesc.length > 0 &&
                                                <div className={`ml-auto mr-2 ${values.huntDesc.length > MAX_DESC_LENGTH - 50 ? 'text-danger' : 'text-muted'}`}><span>{values.huntDesc.length}</span><span>/{MAX_DESC_LENGTH}</span></div>}
                                        </div>

                                    </Form.Group> */}
                                    <Form.Label>How long would you like to keep hunting for this role?</Form.Label>
                                    {/* <InputGroup>
                                        <Form.Control id="newHunt.huntExpire" type="number" min="1" max="12" name="huntExpire"
                                            placeholder="1-12" value={values.huntExpire}
                                            isInvalid={touched.huntExpire && errors.huntExpire}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <InputGroup.Append>
                                            <InputGroup.Text>months</InputGroup.Text>
                                        </InputGroup.Append>
                                        <ErrorMessage name="huntExpire" component="div" className="text-danger" />
                                    </InputGroup> */}
                                </Form>
                            </Col>
                            <Col md={11} className="my-3">
                                <Button variant="secondary" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                                    Add application
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default NewJob
