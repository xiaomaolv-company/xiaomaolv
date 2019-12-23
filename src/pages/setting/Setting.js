import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as comHistory from '../../utils/common-history';
import {observer, inject} from "mobx-react";

@inject('settingStore')
@observer
class Setting extends Component {
  render() {
    const {settingStore: {age, changeAge}} = this.props;
    return (
      <div className="page_Setting">
        <div onClick={() => {
          changeAge(20)
        }}>设置
        </div>
        <button onClick={() => {
          comHistory.back(-1)
        }}>返回
        </button>
        <div>年龄：{age}</div>
      </div>
    );
  }

  componentDidMount() {

  }
}

export default withRouter(Setting);