import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

import Modal from 'react-bootstrap/Modal'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Plot from 'react-plotly.js';

class TankLevelCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTankLevelModal: false,
        }
    }
    render() {
        const now = this.props.level;
        const progressInstance = <ProgressBar
            animated
            now={now}
            label={`${now}%`}
        />;
        return (
            <div class="col-4">
                <Card
                    class="card tankLevelCard"
                    onClick={this.openModal.bind(this)}
                >
                    <div class="card-header">
                        Cistern Level
                        </div>
                    <div class="card-body">
                        {progressInstance}
                    </div>
                </Card>
                <TankLevelModal show={this.state.showTankLevelModal} levels={this.props.levels} onHide={() => this.setState({ showTankLevelModal: false })} />
            </div>
        )
    }

    openModal(e) {
        console.log("Open tank modal")
        this.setState({ showTankLevelModal: true })
    }
}


function TankLevelModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="xl"
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Water Levels
          </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <Row>
                        <Plot
                            style = {{width:"100%"}}
                            data={[
                                {
                                    x: props.levels.x,
                                    y: props.levels.y,
                                    type: 'scatter',
                                    mode: 'lines+markers',
                                    marker: { color: 'blue' },
                                }
                            ]}
                            config={{
                                displayModeBar: false,
                                // responsive: true,
                            }}
                            layout={{
                                autosize: true,
                                // title: 'A Fancy Plot',
                                yaxis: {
                                    title: "Gallons"
                                },
                            }}
                        />
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}




export default TankLevelCard
