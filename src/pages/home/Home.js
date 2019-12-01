import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as comHistory from '@utils/common-history';
import {observer, inject} from "mobx-react";

import {Button, WingBlank,Grid} from "antd-mobile";

@inject('homeStore')
@inject('settingStore')
@observer
class Home extends Component {

  constructor(props) {
    super(props);
    this.jump = this.jump.bind(this);
  }

  jump() {
    comHistory.href(this, '/setting', {name: '惠思雨'});
  }

  render() {
    const {
      homeStore: {menuData},
    } = this.props;
    return (
      <div className="page_home">
        <Grid
          data={menuData}
        />
      </div>
    );
  }

  componentDidMount() {
    const {
      homeStore: {getMenu},
    } = this.props;
    getMenu();
  }
}

export default withRouter(Home);