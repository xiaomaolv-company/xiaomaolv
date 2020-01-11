import React, {Component} from 'react';
import {observer, inject} from "mobx-react";
import {toJS} from 'mobx';
import {Picker, List} from 'antd-mobile';
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
    //const year = new Date().getFullYear();
    const {
      queryBillList
    } = this.props.billStore
    queryBillList({year: v+''})
  }

  render() {
    const {
      recorderSummaryData
    } = this.props.billStore
    console.log(toJS(recorderSummaryData),'tttt')
    const me = this
    return (

      <div className="Bill">
        <div className="billHeader">
          <div className="billHeader_top">
            <div className="billHeader_top_left">
              <p className="billHeader_top_left_balance_text">结余</p>
              <p className="billHeader_top_left_balance">-132.00</p>
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
              <p className="income_text">收入</p>
              <p className="income_num">0.00</p>
            </div>
            <div className="pay_wrapper">
              <p className="pay_text">支出</p>
              <p className="pay_num">132.00</p>
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
            recorderSummaryData.length>0 ?
              recorderSummaryData.map(recordItem=>{
                return(
                  <div style={{display:'flex'}} key={recordItem.month} className="recorderList">
                    <div className="recorderItem">{recordItem.month}</div>
                    <div className="recorderItem">{recordItem.income}</div>
                    <div className="recorderItem">{recordItem.pay}</div>
                    <div className="recorderItem">{recordItem.balance}</div>
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