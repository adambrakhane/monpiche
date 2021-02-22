import Door from './door'
import React from 'react';


class GarageDoorCard extends React.Component {

  render() {
    return (
        <div class="col-4">
          <div class="card">
            <div class="card-header">
              Garage Doors
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-sm">
                  <h5 class="card-title">Left</h5>
                  <Door isOpen={this.props.LeftOpen} />
                </div>
                <div class="col-sm">
                  <h5 class="card-title">Right</h5>
                  <Door isOpen={this.props.RightOpen} />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}


export default GarageDoorCard
