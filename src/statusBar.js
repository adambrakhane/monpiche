import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

class StatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state
  }
  render() {
    var variant = "primary"
    var alerts = 0;
    alerts = (this.props.state.garageDoors.left ? alerts + 1 : 0)
    alerts = (this.props.state.garageDoors.right ? alerts + 1 : 0)
    alerts = (this.props.state.houseDoors.front ? alerts + 1 : 0)
    alerts = (this.props.state.houseDoors.diningRoom ? alerts + 1 : 0)
    alerts = (this.props.state.houseDoors.kitchen ? alerts + 1 : 0)
    alerts = (this.props.state.tankLevel < 15 ? alerts + 1 : 0)

    if (alerts > 0) {
      variant = "danger"
    }

    return (
      <Alert variant={variant}>
        &nbsp;
        <Button variant="primary" onClick={this.props.openControls}>Controls</Button>
        <Clock />
        {/* <hr />
        <p class="mb-0">
          Whenever you need to, be sure to use margin utilities to keep things nice
          and tidy.
        </p> */}
      </Alert>
    )
  }

}


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTime: "00:00:00" };
  }

  tick() {
    var d = new Date()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    var text = "AM"
    if (hours > 12) { hours = hours - 12; text = "PM" }

    // Pad minutes and hours with zeros
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }

    this.setState(state => ({
      currentTime: hours + ":" + minutes + ":" + seconds + " " + text
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
        <div style={{ float: "right" }}>
          {this.state.currentTime}
        </div>
    );
  }
}


export default StatusBar
