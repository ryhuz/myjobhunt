import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import NewJob from './NewJob'

function Hunt() {
    let { id } = useParams();
    let thisHunt = useSelector(state => state.hunt.hunts.find(hunt => hunt._id === id));
    let jobsInHunt = useSelector(state => state.hunt.jobApplications.map(job => job.inHuntGroup === id));
    const [showNewJobModal, setShowNewJobModal] = useState(false)

    console.log(thisHunt)
    function invalidHunt() {
        return (
            <>
                <Jumbotron>
                    <h2>Oops, you don't have such a hunt</h2>
                </Jumbotron>
            </>
        )
    }
    function convertTime(time) {
        return DateTime.fromISO(time).toFormat('dd LLL yyyy');
    }
    function showStartEnd(time, type) {
        return (
            <Col sm={4}>
                <div className="border py-4 text-center">
                    <span>{type}</span>
                    <span className="h4 ml-4">{convertTime(time)}</span>
                </div>
            </Col>
        )
    }
    return (
        <>
            {thisHunt ?
                <>
                    <NewJob show={showNewJobModal} hide={() => setShowNewJobModal(false)} />
                    <Jumbotron>
                        <h2>{thisHunt.huntTitle}</h2>
                    </Jumbotron>
                    <Container>
                        <Row sm={2} className="justify-content-center mb-4">
                            {showStartEnd(thisHunt.huntStart, "Started on: ")}
                            {showStartEnd(thisHunt.huntExpire, "Ending: ")}
                        </Row>
                        <h3>Job Applications</h3>
                        <Row md={4} sm={3}>
                            <Col className="p-2">
                                <div className="border p-4 hunt-container" onClick={() => setShowNewJobModal(true)}>
                                    <h2 className="text-center"><FontAwesomeIcon icon={faPlus} /></h2>
                                    <div className="text-center">Add job application</div>
                                </div>
                            </Col>
                            {jobsInHunt.length ?
                                <>
                                    {jobsInHunt.map(job => (
                                        <Col key={job._id} className="p-2">
                                            <div className="border p-4 hunt-container">
                                                <h4>{job.title}</h4>
                                                {/* <div><span className="small pr-2"><b>Started: </b></span>{convertTime(hunt.huntStart)}</div>
                                                <div><span className="small pr-2"><b>Ends in: </b></span>{convertTime(hunt.huntStart, hunt.huntExpire)}</div> */}
                                            </div>
                                        </Col>
                                    ))
                                    }
                                </>
                                :
                                <Col className="p-2">
                                    <div className="border p-4 hunt-container">
                                        <div>No applications yet</div><div>Add one now!</div>
                                    </div>
                                </Col>
                            }
                        </Row>
                    </Container>
                </>
                : invalidHunt()
            }
        </>
    )
}

export default Hunt
