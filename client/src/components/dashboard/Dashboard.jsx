import React, { useState } from 'react'
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { getName } from '../../app/userDetailSlice'
import { getHunts, addHunt } from '../../app/huntSlice'

import SideBar from './SideBar';
import NewHunt from './NewHunt'

function Dashboard() {
    let dispatch = useDispatch()
    let name = useSelector(getName);
    let myHunts = useSelector(getHunts);

    const [showNewHuntModal, setShowNewHuntModal] = useState(false)



    return (
        <>
            <NewHunt show={showNewHuntModal} hide={() => setShowNewHuntModal(false)} />
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
                        <Row md={4} sm={3}>
                            <Col className="p-2">
                                <div className="border p-4 hunt-container"
                                    onClick={() => setShowNewHuntModal(true)}>
                                    <h2 className="text-center"><FontAwesomeIcon icon={faPlus} /></h2>
                                    <div className="text-center">Create New Hunt</div>
                                </div>
                            </Col>
                            {myHunts.length ?
                                <>
                                    {myHunts.map(hunt => (
                                        <Col key={hunt._id} className="p-2">
                                            <div className="border p-4 hunt-container">
                                                <div>{hunt.huntTitle}</div>
                                                <div>{hunt.huntDesc}</div>
                                                <div>{hunt.huntExpire}</div>
                                            </div>
                                        </Col>
                                    ))
                                    }
                                </>
                                :
                                <Col className="p-3">
                                    <div className="border p-4 hunt-container">
                                        <div>No ongoing hunts.</div><div>Why not create one to get started?</div>
                                    </div>
                                </Col>
                            }
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
        </>
    )
}

export default Dashboard
