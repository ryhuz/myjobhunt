import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

function LogIn({ display, setDisplay }) {
    const thisModal = 'login';
    const otherModal = 'register';
    function changeModal() {
        setDisplay(thisModal, false)
        setDisplay(otherModal, true)
    }
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    })
    function formUpdate(e) {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value,
        })
    }
    return (
        <Modal centered size='lg' show={display} onHide={() => setDisplay(thisModal, false)}>
            <Modal.Header closeButton>
                <Modal.Title className="ml-auto">Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Form>
                            <Form.Label>username</Form.Label>
                            <Form.Control type="text" name="username" onChange={e => formUpdate(e)} />
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" name="password" onChange={e => formUpdate(e)} />
                        </Form>
                    </Col>
                    <Col md={8} className="my-3">
                        <Button variant="secondary" block>
                            Log In
                    </Button>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    Don't have an account? Register one <span onClick={changeModal}>here</span>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default LogIn
