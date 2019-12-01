import React, {Component} from 'react';
import {WingBlank, NavBar, Icon} from "antd-mobile";

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation-mod">
        <WingBlank size="md">
          {this.props.children}
        </WingBlank>
      </div>
    );
  }
}

export default Navigation;