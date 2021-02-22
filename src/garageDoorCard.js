import Door from './door'
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';


class GarageDoorCard extends React.Component {

  render() {
    return (
      <div>
        <Card>
          <Card.Header>
            🚗 Garage Doors
      </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <h5 class="card-title">Left</h5>
                <Door isOpen={this.props.LeftOpen} />
              </Col>
              <Col>
                <h5 class="card-title">Right</h5>
                <Door isOpen={this.props.RightOpen} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    )
  }
}


export default GarageDoorCard
