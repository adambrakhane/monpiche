import './App.css';
import React from 'react';



import GarageDoorCard from './garageDoorCard'
import HouseDoorCard from './houseDoorCard'
import TankLevelCard from './tankLevelCard'
import WeatherCard from './weatherCard'
import StatusBar from './statusBar'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tankLevel: 0,
      garageDoors: {
        left: false,
        right: false,
      },
      houseDoors: {
        front: false,
        diningRoom: false,
        kitchen: false,
      },
      showControlPanel: null,
      tankLevels: {
        x: [],
        y: [],
        revision: 0,
      },
    }
    // Check tank level stub
    setInterval(() => {
      var lvl = Math.floor((Math.random() * 100) + 1);
      this.setState({ tankLevel: lvl })

      var levels = this.state.tankLevels

      var now = new Date()
      levels.x.push(now.toISOString())
      levels.y.push(lvl)
      levels.revision = this.state.tankLevels.revision + 1
      this.setState({tankLevels: levels})

    }, 1600);

    // Check door status stub
    setInterval(() => {
      this.setState({
        houseDoors: {
          front: Math.random() > 0.8,
          kitchen: Math.random() > 0.8,
          diningRoom: Math.random() > 0.8,
        },
        garageDoors: {
          left: Math.random() > 0.8,
          right: Math.random() > 0.8,
        }
      })
    }, 2500);
  }

  handleClick = buttonName => {
    console.log(buttonName + " pushed")
  };

  render() {

    return (
      <div className="App">
        {/* <StatusBar openControls={() => this.setState({showControlPanel:true})} state={this.state}/> */}
        <StatusBar openControls={this.openControlPanel.bind(this)} state={this.state} />
        <Container>
          <Row>
            <GarageDoorCard LeftOpen={this.state.garageDoors.left} RightOpen={this.state.garageDoors.right} />
            <HouseDoorCard DiningRoomOpen={this.state.houseDoors.diningRoom} FrontOpen={this.state.houseDoors.front} KitchenOpen={this.state.houseDoors.kitchen} />
            <TankLevelCard level={this.state.tankLevel} levels={this.state.tankLevels}/>
          </Row>
          <Row>
            <WeatherCard />
          </Row>
        </Container>
        <MydModalWithGrid show={this.state.showControlPanel} onHide={() => this.setState({ showControlPanel: false })} />
      </div>
    );
  }

  openControlPanel(e) {
    console.log("Open control panel")
    console.log(e)
    this.setState({ showControlPanel: true })
  }
}





function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
