import React, {Component} from 'react';
import "./KeepingAccounts.less";
import {observer, inject} from "mobx-react";
import {Tabs, Grid, List, InputItem} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import keepingAccountsStore from "../../stores/keepingAccountsStore";
// import {toJS} from "mobx";

@withRouter
@inject("keepingAccountsStore")
@observer
class KeepingAccounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false
    }
  }

  /**
   * tabItem 的点击事件
   * @param item tabItem具体信息
   * @param index 索引
   */
  tabItemClick = (item, index) => {
    const {
      keepingAccountsStore: {
        setCurrentActiveTabItemId,
        inputOnChange,
        currentActiveTabItemId
      }
    } = this.props;
    if (currentActiveTabItemId !== item.id) { // 说明选中的还是目前当前已经被选中的tabItem,不清空input框里的数据
      inputOnChange('');
    }
    setCurrentActiveTabItemId(item.id);
    this.setState({inputVisible: true});
    this.numberInput.focus();
  };

  /**
   * 渲染tabs的Item
   * @param tabItem
   * @returns {*}
   */
  renderTabsItemContent = tabItem => {
    return (
      <Grid
        data={tabItem.data}
        onClick={this.tabItemClick}
        hasLine={false}
        renderItem={this.renderGridItem}
      />
    )
  };

  renderGridItem = (item, index) => {
    const {
      keepingAccountsStore: {
        currentActiveTabItemId
      }
    } = this.props;
    return (
      <div className="gridItem">
        <div className="iconfontWrapper"
             style={{backgroundColor: `${currentActiveTabItemId === item.id ? '#108ee9' : '#f2f2f2'}`}}>
          <i className={`iconfont ${item.icon}`}></i>
        </div>
        <div className="name">{item.name}</div>
      </div>
    )
  };

  /**
   * input的值变化事件
   * @param value input里面的值
   */
  inputOnChange = (value) => {
    const {
      keepingAccountsStore: {
        inputOnChange
      }
    } = this.props;
    inputOnChange(value);
  };

  /**
   * input 确定按钮的点击事件
   * @param value
   */
  inputConfirm = (value) => {
    const {
      keepingAccountsStore: {
        saveCostData
      }
    } = this.props;
    saveCostData(value);
    this.setState({inputVisible: false})
  };


  render() {
    const {
      keepingAccountsStore: {
        amount,
        tabsData,
        moneyKeyboardWrapProps
      }
    } = this.props;
    const {inputVisible} = this.state;
    return (
      <div className="KeepingAccounts">
        <Tabs
          tabs={tabsData}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2}/>}
        >
          {this.renderTabsItemContent}
        </Tabs>

        <div className="inputWrapper" style={{display: `${inputVisible ? 'block' : 'none'}`}}>
          <List>
            <InputItem
              type="money"
              value={amount}
              placeholder="请输入金额"
              onChange={this.inputOnChange}
              ref={el => this.numberInput = el}
              extra="¥"
              onVirtualKeyboardConfirm={this.inputConfirm}
              moneyKeyboardAlign="left"
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              onBlur={() => {
                this.setState({inputVisible: false})
              }}
            >
              金额：
            </InputItem>
          </List>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const {
      keepingAccountsStore: {
        getCostTypeData,
        setMoneyKeyboardWrapProps
      }
    } = this.props;
    getCostTypeData();
    setMoneyKeyboardWrapProps();
  }
}

export default KeepingAccounts;