import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {toJS} from 'mobx';
import "./Mine.less";

@inject("mineStore")
@observer
class Mine extends Component {

  render() {
    const {
      userData,
      loginUserInfo
    } = this.props.mineStore
    const avater = userData?userData.avater:null
    const userName = userData?userData.name:null
    const continueLoginDays = loginUserInfo?loginUserInfo.loginDays:0
    const totalAccountNums = loginUserInfo?loginUserInfo.totalAccountNums:0
    const totalAccountDays = loginUserInfo?loginUserInfo.totalAccountDays:0
    console.log(toJS(userData),"ddd")
    return (
      <div className="Mine">
        <div>
          <div className="avater_wrapper">
            <div className="avater" style={{background:`url(${avater ? avater : ''})`}}></div>
          </div>
          <div className="mineName_wrapper">
            <p className="mineName">{userName}</p>
          </div>
          <div className="recorder_list">
            <div className="recorder_item">
              <p className="recorder_item_num">{continueLoginDays}</p>
              <p className="recorder_item_text">已连续打卡</p>
            </div>
            <div className="recorder_item">
              <p className="recorder_item_num">{totalAccountDays}</p>
              <p className="recorder_item_text">总记账天数</p>
            </div>
            <div className="recorder_item">
              <p className="recorder_item_num">{totalAccountNums}</p>
              <p className="recorder_item_text">总记账笔数</p>
            </div>
          </div>
        </div>


      </div>
    );
  }

  componentDidMount() {
    const {
      queryUserData,
      getUserLoginInfo
    } = this.props.mineStore;
    queryUserData()
    getUserLoginInfo()
  }
}

export default Mine;