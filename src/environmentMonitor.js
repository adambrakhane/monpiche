import Door from './door'
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';


class EnvironmentMonitor extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                         👶 Environment Monitor
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h5 class="card-title">Pm2.5</h5>
                                <p>67 mg/m<sup>3</sup></p>
                            </Col>
                            <Col>
                                <h5 class="card-title">Temperature</h5>
                                <p>78°F</p>
                            </Col>
                            <Col>
                                <h5 class="card-title">Humidity</h5>
                                <p>36%</p>
                            </Col>
                            <Col>
                                <h5 class="card-title">VOC</h5>
                                <p>2636 ppm</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
export default EnvironmentMonitor
