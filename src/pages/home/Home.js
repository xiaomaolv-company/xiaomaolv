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
        <button onClick={this.jump}>跳转</button>
        <button onClick={this.changeName}>改变姓名</button>
        <button onClick={this.changeAge}>改变年龄</button>
        <div>{name}</div>
        <div>{age}</div>
        <Button>按钮</Button>
      </div>
    );
  }

  componentDidMount() {

  }
}

export default withRouter(Home);