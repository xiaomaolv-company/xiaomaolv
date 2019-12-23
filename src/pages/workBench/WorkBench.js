import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {observer, inject} from "mobx-react";
import {TabBar} from "antd-mobile";
import "./WorkBench.less";
import Setting from "../setting/Setting";
import * as commonHistory from '@utils/common-history';

@withRouter
@inject("workBenchStore")
@observer
class WorkBench extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * 渲染tabBarItem里面的内容
   * @param tabBarName tabBarItem的信息
   */
  handleRenderTabItemContent = (tabBarItem) => {
    const {tabBarName} = tabBarItem;
    if (tabBarName === '明细') {

    }
    if (tabBarName === '图表') {

    }
    if (tabBarName === '记账') {
      // commonHistory.href(this, '/keeping-accounts');
    }
    if (tabBarName === '账单') {

    }
    if (tabBarName === '我的') {
      return (
        <Setting

        />
      )
    }
  };

  /**
   * tabBarItem 的点击交互效果时间
   * @param tabBarName
   */
  handleOnPress = (tabBarItem) => {
    const {tabBarId, tabBarName} = tabBarItem;
    if (tabBarName === '记账') {
      commonHistory.href(this, '/keeping-accounts');
      return;
    }
    const {workBenchStore: {handleOnPress}} = this.props;
    handleOnPress(tabBarId);
  };

  render() {
    const {
      workBenchStore: {
        tabBarData,
        selectedTab,
      }
    } = this.props;
    return (
      <div className="WorkBench">
        <TabBar>
          {
            tabBarData.length > 0 ?
              tabBarData.map(tabBarItem => {
                return (
                  <TabBar.Item
                    title={tabBarItem.tabBarName}
                    key={tabBarItem.tabBarId}
                    icon={<i style={{fontSize: '22px'}} className={`iconfont ${tabBarItem.icon}`}></i>}
                    selectedIcon={<i style={{fontSize: '22px'}} className={`iconfont ${tabBarItem.icon}`}></i>}
                    selected={selectedTab == tabBarItem.tabBarId}
                    onPress={() => {
                      this.handleOnPress(tabBarItem);
                    }}
                  >
                    {
                      this.handleRenderTabItemContent(tabBarItem)
                    }
                  </TabBar.Item>
                )
              })
              :
              null
          }
        </TabBar>
      </div>
    );
  }

  componentDidMount() {

    const {workBenchStore: {getTabBarData}} = this.props;
    getTabBarData();

  }

}

export default WorkBench;