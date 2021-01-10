import React, { useState } from 'react'
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { DateTime, Interval } from "luxon";

import { getName, expirySetting } from '../../app/userDetailSlice'
import { getHunts } from '../../app/huntSlice'

import SideBar from './SideBar';
import NewHunt from './NewHunt'
import { NavLink } from 'react-router-dom'

function Dashboard() {
    let name = useSelector(getName);
    let expiry = useSelector(expirySetting)
    let myHunts = useSelector(getHunts);
    const [showNewHuntModal, setShowNewHuntModal] = useState(false)

    function convertTime(time, time2 = "") {
        if (!time2) {
            return DateTime.fromISO(time).toFormat('LLL yyyy');
        } else {
            let from = DateTime.fromISO(time);
            let to = DateTime.fromISO(time2);
            let interval = Interval.fromDateTimes(from, to).toDuration().shiftTo('months', 'days').toObject();

            let months = interval.months ? `${interval.months} month${interval.months > 1 ? "s" : ""}` : "";
            let days = Math.floor(interval.days) ? `${Math.floor(interval.days)} day${Math.floor(interval.days) > 1 ? "s" : ""}` : "";
            return `${months} ${days}`;
        }
    }
    function expiring(end, exp) {
        let now = DateTime.local();
        let ending = DateTime.fromISO(end);
        let interval = Interval.fromDateTimes(now, ending).toDuration().shiftTo('weeks').toObject()

        return exp > interval.weeks;

    }
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
                                            <div className={`border p-4 hunt-container ${expiring(hunt.huntExpire, expiry) ? "hunt-expiring" : ""}`} >
                                                <NavLink to={`/hunt/${hunt._id}`}>
                                                    <h4>{hunt.huntTitle}</h4>
                                                    <div><span className="small pr-2"><b>Started: </b></span>{convertTime(hunt.huntStart)}</div>
                                                    <div><span className="small pr-2"><b>Ends in: </b></span>{convertTime(hunt.huntStart, hunt.huntExpire)}</div>
                                                </NavLink>
                                            </div>
                                        </Col>
                                    ))
                                    }
                                </>
                                :
                                <Col className="p-2">
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
