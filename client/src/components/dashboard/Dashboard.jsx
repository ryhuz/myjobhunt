import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getName } from '../../app/userDetailSlice'
import SideBar from './SideBar';


function Dashboard() {
    let name = useSelector(getName);

    console.log(name);
    return (
        <Row noGutters='true'>
            <Col md={2}>
                <SideBar />
            </Col>
            <Col>
                <Jumbotron>
                    <h2>Welcome back {name.firstname}</h2>
                </Jumbotron>
                <Container>
                    <h3>Your Current Hunts</h3>
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
                    <h3>Past Hunts</h3>
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
