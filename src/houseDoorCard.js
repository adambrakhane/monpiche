import Door from './door'
import React from 'react';


class HouseDoorCard extends React.Component {
    render() {
        return (
            <div class="col-4">
                <div class="card">
                    <div class="card-header">
                        House Doors
          </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm">
                                <h5 class="card-title">Front</h5>
                                <Door isOpen={this.props.FrontOpen} />
                            </div>
                            <div class="col-sm">
                                <h5 class="card-title">Kitchen</h5>
                                <Door isOpen={this.props.KitchenOpen} />
                            </div>
                            <div class="col-sm">
                                <h5 class="card-title">Dining Room</h5>
                                <Door isOpen={this.props.DiningRoomOpen} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default HouseDoorCard
