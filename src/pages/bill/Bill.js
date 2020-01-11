import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {Picker, List} from 'antd-mobile';
import {toJS} from "mobx";
import "./Bill.less";

@inject("billStore")
@observer
class Bill extends Component {
  constructor(props) {
    super(props);
    const currentYear = new Date().getFullYear();
    const yearData = []
    for(var i=0;i<5;i++){
      const label = currentYear-i+"年"
      const value = currentYear-i
      yearData.push({value:value+'',label:label})
    }
    this.state = {
      yearData: yearData,
      cols: 1,            //列数
      asyncValue: [currentYear+''],
      visible: false
    };
  }
  onPickerChange(){

  }
  onClick(){

  }
  onOk(v){
    this.setState({asyncValue:[v+'']})
    const {
      queryBillList
    } = this.props.billStore
    queryBillList({year: v+''})
  }

  render() {
    const {
      recorderSummaryData
    } = this.props.billStore

    const monthBillData = Object.prototype.toString.call(recorderSummaryData.monthBill) === "[object Array]"?recorderSummaryData.monthBill:[];
    const yearBillData = Object.prototype.toString.call(recorderSummaryData.yearBill) === "[object Array]"?recorderSummaryData.yearBill[0]:{income:0,balance:0,pay:0};
    const me = this
    return (

      <div className="Bill">
        <div className="billHeader">
          <div className="billHeader_top">
            <div className="billHeader_top_left">
              <p className="billHeader_top_left_balance_text">结余</p>
              <p className="billHeader_top_left_balance">{yearBillData.balance.toFixed(2)}</p>
            </div>
            <div className="billHeader_top_right">
              <Picker
                data={this.state.yearData}
                cols={this.state.cols}
                value={this.state.asyncValue}
                onPickerChange={this.onPickerChange}
                onOk={v => this.onOk(v)}

              >
                <List.Item arrow="horizontal" onClick={this.onClick}></List.Item>
              </Picker>
            </div>
          </div>
          <div className="billHeader_bottom">
            <div className="income_wrapper">
              <p className="income_text">收入：</p>
              <p className="income_num">{yearBillData.income.toFixed(2)}</p>
            </div>
            <div className="pay_wrapper">
              <p className="pay_text">支出：</p>
              <p className="pay_num">{yearBillData.pay.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="billBottom">
          <div className="formheader" style={{display:'flex'}}>
            <div className="formheaderItem">月份</div>
            <div className="formheaderItem">收入</div>
            <div className="formheaderItem">支出</div>
            <div className="formheaderItem">结余</div>
          </div>
          {
            monthBillData.length>0 ?
              monthBillData.map(monthBillDataItem=>{
                return(
                  <div style={{display:'flex'}} key={monthBillDataItem.month} className="recorderList">
                    <div className="recorderItem">{monthBillDataItem.month}</div>
                    <div className="recorderItem">{monthBillDataItem.income.toFixed(2)}</div>
                    <div className="recorderItem">{monthBillDataItem.pay.toFixed(2)}</div>
                    <div className="recorderItem">{monthBillDataItem.balance.toFixed(2)}</div>
                  </div>
                )
              }):null
          }
        </div>
      </div>
    );
  }

  componentDidMount() {
    const year = new Date().getFullYear();
    const {
      queryBillList
    } = this.props.billStore
    queryBillList({year: year})
  }
}

export default Bill;