import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as comHistory from '@utils/common-history';
import {observer, inject} from "mobx-react";

import {Button, WingBlank} from "antd-mobile";

@inject('homeStore')
@inject('settingStore')
@observer
class Home extends Component {

  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this);
  }

  changeName = () => {
    const {homeStore: {changeName}} = this.props;
    changeName("严小博");
  };

  changeAge = () => {
    const {settingStore: {changeAge}} = this.props;
    changeAge(30);
  };

  jump() {
    comHistory.href(this, '/setting', {name: '惠思雨'});
  }

  render() {
    const {
      homeStore: {name},
      settingStore: {age}
    } = this.props;
    return (
      <div className="page_home">
        首页
        <Button>按钮</Button>
      </div>
    );
  }

  componentDidMount() {

  }
}

export default withRouter(Home);