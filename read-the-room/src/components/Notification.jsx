import React, { Component } from "react";

class SimpleNotification extends Component {
  constructor(props) {
    super(props);
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
  }

  showNotification() {
    new Notification('Read the Room: ' + this.props.message)
  }

  render() {
    return (
      <div>
          {/* TODO remove button once integrated */}
        <button onClick={this.showNotification}>
          Click to show notification
        </button>
      </div>
    );
  }
}

export default SimpleNotification;