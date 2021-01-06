import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getName } from '../../app/userDetailSlice'


function Dashboard() {
    let name = useSelector(getName);

    console.log(name);
    return (
        <Row noGutters='true'>
            <Col md={2} className="bg-primary" id='sidebar'>
                Side Nav Bar
            </Col>
            <Col>
                <Jumbotron>
                    <h2>Welcome back {name.firstname}</h2>
                    Dashboard
                </Jumbotron>
                <Container>
                    <Row md={4}>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>
                        <Col>Test</Col>

                    </Row>
                </Container>
            </Col>
        </Row>
    )
}

export default Dashboard
