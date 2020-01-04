import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {toJS} from 'mobx';
import {PickerView} from 'antd-mobile';
import {DatePicker, List} from 'antd-mobile';
import "./Bill.less";

@inject("billStore")
@observer
class Bill extends Component {
  render() {
    const {
      recorderSummaryData
    } = this.props.billStore
    console.log(toJS(recorderSummaryData))
    const me = this
    return (

      <div className="Bill">
        <div className="billHeader">
          <div className="billHeader_top">
            <div className="billHeader_top_left">
              <p>结余</p>
              <p>-132.00</p>
            </div>
            <div className="billHeader_top_right">

            </div>
          </div>
          <div className="billHeader_bottom">
            <div className="income_wrapper">
              <p className="income_text">收入</p>
              <p className="income_num">0.00</p>
            </div>
            <div className="pay_wrapper">
              <p className="pay_text">支出</p>
              <p className="pay_num">132.00</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const year = new Date().getFullYear();
    const {
      queryBillList
    } = this.props.billStore
    console.log("年份", year)
    queryBillList({year: year})
  }
}

export default Bill;