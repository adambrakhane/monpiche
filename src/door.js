import Badge from 'react-bootstrap/Badge'
import React from 'react';

class Door extends React.Component {
    render() {
        var variant = "primary"
        var btnText = "?"
        switch (this.props.isOpen) {
            case true:
                variant = "warning"
                btnText = "Open"
                break
            case false:
            default:
                // @todo, check how long it has been open and go to red
                // or if it's night or something
                variant = "success"
                btnText = "Closed"
                break
        }

        return (<Badge variant={variant} size="sm">{btnText}</Badge>)
    }
}

export default Door