import React, {Component} from 'react';
import "./KeepingAccounts.less";
import {observer, inject} from "mobx-react";
import {PullToRefresh} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
@inject("keepingAccountsStore")
@observer
class KeepingAccounts extends Component {
  render() {
    const {} = this.props;
    return (
      <div className="KeepingAccounts">
        记账
        <PullToRefresh

        />
      </div>
    );
  }
}

export default KeepingAccounts;