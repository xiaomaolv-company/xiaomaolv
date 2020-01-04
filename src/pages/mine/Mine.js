import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {toJS} from 'mobx';
import "./Mine.less";

@inject("mineStore")
@observer
class Mine extends Component {

  render() {
    const {
      mineStore:{
        userData
      }
    } = this.props
    const avater = userData?userData.avater:null
    const userName = userData?userData.name:null
    console.log(avater,"ddd")
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
              <p className="recorder_item_num">0</p>
              <p className="recorder_item_text">已连续打卡</p>
            </div>
            <div className="recorder_item">
              <p className="recorder_item_num">24</p>
              <p className="recorder_item_text">总记账天数</p>
            </div>
            <div className="recorder_item">
              <p className="recorder_item_num">4</p>
              <p className="recorder_item_text">总记账笔数</p>
            </div>
          </div>
        </div>


      </div>
    );
  }

  componentDidMount() {
    const {
      queryUserData
    } = this.props.mineStore;
    queryUserData()
  }
}

export default Mine;