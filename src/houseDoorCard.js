import Door from './door'
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';


class HouseDoorCard extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Header>
                        🚪 House Doors
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h5 class="card-title">Front</h5>
                                <Door isOpen={this.props.FrontOpen} />
                            </Col>
                            <Col>
                                <h5 class="card-title">Kitchen</h5>
                                <Door isOpen={this.props.KitchenOpen} />
                            </Col>
                            <Col>
                                <h5 class="card-title">Dining Room</h5>
                                <Door isOpen={this.props.DiningRoomOpen} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
export default HouseDoorCard
