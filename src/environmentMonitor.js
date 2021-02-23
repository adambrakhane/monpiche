
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Plot from 'react-plotly.js';
import './environmentMonitor.css'


class EnvironmentMonitor extends React.Component {
    render() {
        return (
            <div>
                <Card className="environmentMonitorCard">
                    <Card.Header>
                        👶 Environment Monitor
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>
                                <h5 className="card-title">Pm2.5 <em>(mg/m<sup>3</sup>)</em></h5>
                                <Gauge
                                    value={425}
                                    previousValue={200}
                                    steps={[
                                        { range: [0, 300], color: "lightgreen" },
                                        { range: [300, 575], color: "yellow" },
                                        { range: [575, 2000], color: "red" }
                                    ]}
                                    // thresholdValue={250}
                                    rangeMax={2000}
                                    rangeMin={0}
                                />
                            </Col>
                            <Col>
                                <h5 className="card-title">Temperature <em>(°F)</em></h5>
                                <Gauge
                                    value={72}
                                    previousValue={73}
                                    steps={[
                                        { range: [0, 65], color: "red" },
                                        { range: [65, 68], color: "yellow" },
                                        { range: [68, 72], color: "lightgreen" },
                                        { range: [72, 75], color: "yellow" },
                                        { range: [75, 100], color: "red" }
                                    ]}
                                    // thresholdValue={250}
                                    rangeMax={90}
                                    rangeMin={50}
                                />
                            </Col>
                            <Col>
                                <h5 className="card-title">Humidity <em>(% H<sub>2</sub>0)</em></h5>
                                <Gauge
                                    value={36}
                                    previousValue={36}
                                    steps={[
                                        { range: [0, 30], color: "yellow" },
                                        { range: [30, 60], color: "lightgreen" },
                                        { range: [60, 100], color: "yellow" }
                                    ]}
                                    // thresholdValue={250}
                                    rangeMax={100}
                                    rangeMin={0}
                                />
                            </Col>
                            <Col>
                                <h5 className="card-title">VOC <em>(ppm)</em></h5>
                                <Gauge
                                    value={425}
                                    previousValue={200}
                                    steps={[
                                        { range: [0, 300], color: "lightgreen" },
                                        { range: [300, 575], color: "yellow" },
                                        { range: [575, 2000], color: "red" }
                                    ]}
                                    // thresholdValue={250}
                                    rangeMax={2000}
                                    rangeMin={0}
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}
export default EnvironmentMonitor


function Gauge(props) {
    // todo clear up defaults
return (
    <Plot
    data={[
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: props.value,
            title: { text: props.unit },
            type: "indicator",
            mode: "gauge+number+delta",
            delta: { reference: props.previousValue },
            gauge: {
                axis: { range: [props.rangeMin, props.rangeMax] },
                steps: props.steps,
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: props.thresholdValue
                },
                bar: { color: "black" },
            }
        }
    ]}
    layout={{  height: 155,
        width: 145,
        margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
          pad: 0
        }}}
    config={{
        displayModeBar: false,
        // responsive: true,
    }}
/>
)
}