import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'

function Dashboard() {
    return (
        <Row noGutters='true'>
            <Col md={2} className="bg-primary" id='sidebar'>
                Side Nav Bar
            </Col>
            <Col>
                <Jumbotron>
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
