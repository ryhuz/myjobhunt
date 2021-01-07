import { ErrorMessage, Formik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux'

import { Col, Form, Modal, Row, Button, InputGroup } from 'react-bootstrap';
import * as Yup from 'yup';

import { axiosJobs } from '../../https_requests/requests';
import { addHunt } from '../../app/huntSlice'

function NewHunt({ show, hide }) {
    const dispatch = useDispatch();
    const MAX_DESC_LENGTH = 200;
    const initialForm = {
        huntTitle: "",
        huntDesc: "",
        huntExpire: "12",
    }
    const validation = {
        huntTitle: Yup.string().required().min(5, "why not give it a longer title?"),
        huntDesc: Yup.string().required().min(5, "why not give it a better description?"),
        huntExpire: Yup.number().required("You need to search for at least 1 month!").min(1, "You need to search for at least 1 month!").max(12, "The maximum you can keep a hunt going is 1 year. This is to encourage regular evalutaions of your job hunt!"),
    }

    async function addNewHunt(form, setSubmitting) {
        try {
            let newHunt = await axiosJobs.post('add_hunt', form)
            dispatch(addHunt(newHunt.data.newHunt))
            setSubmitting(false);
            hide()
        } catch (e) {
            console.log(e);
            setSubmitting(false);
        }
    }

    return (
        <Modal centered show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto">Start a New Hunt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialForm} validationSchema={Yup.object(validation)}
                    onSubmit={(values, { setSubmitting }) => {
                        addNewHunt(values, setSubmitting)
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
                                    <Form.Group controlId="newHunt.huntTitle">
                                        <Form.Label>Job Hunt Title (What role are you looking for?)</Form.Label>
                                        <Form.Control type="text" name="huntTitle" value={values.huntTitle}
                                            isInvalid={touched.huntTitle && errors.huntTitle}
                                            onChange={handleChange} onBlur={handleBlur} onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSubmit();
                                                }
                                            }} />
                                        <ErrorMessage name="huntTitle" component="div" className="text-danger" />
                                    </Form.Group>
                                    <Form.Group controlId="newHunt.huntDesc">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" maxlength={MAX_DESC_LENGTH} name="huntDesc" value={values.huntDesc}
                                            isInvalid={touched.huntDesc && errors.huntDesc}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <div className="d-flex justifiy-content-between">
                                            <ErrorMessage name="huntDesc" component="div" className="text-danger" />
                                            {values.huntDesc.length > 0 &&
                                                <div className={`ml-auto mr-2 ${values.huntDesc.length > MAX_DESC_LENGTH - 50 ? 'text-danger' : 'text-muted'}`}><span>{values.huntDesc.length}</span><span>/{MAX_DESC_LENGTH}</span></div>}
                                        </div>

                                    </Form.Group>
                                    <Form.Label>How long would you like to keep hunting for this role?</Form.Label>
                                    <InputGroup>
                                        <Form.Control id="newHunt.huntExpire" type="number" min="1" max="12" name="huntExpire"
                                            placeholder="1-12" value={values.huntExpire}
                                            isInvalid={touched.huntExpire && errors.huntExpire}
                                            onChange={handleChange} onBlur={handleBlur} />
                                        <InputGroup.Append>
                                            <InputGroup.Text>months</InputGroup.Text>
                                        </InputGroup.Append>
                                        <ErrorMessage name="huntExpire" component="div" className="text-danger" />
                                    </InputGroup>
                                </Form>
                            </Col>
                            <Col md={11} className="my-3">
                                <Button variant="secondary" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                                    Start this job hunt!
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default NewHunt
