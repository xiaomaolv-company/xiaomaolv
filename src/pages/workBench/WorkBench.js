import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {observer, inject} from "mobx-react";
import {TabBar} from "antd-mobile";
import "./WorkBench.less";

import Home from "../home/Home";
import Setting from "../setting/Setting";

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
    if (tabBarName === '首页') {
      return (
        <Home

        />
      )
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
  handleOnPress = (tabBarId) => {
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
                    icon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                    }}
                    />}
                    selectedIcon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                    }}
                    />}
                    selected={selectedTab == tabBarItem.tabBarId}
                    onPress={() => {
                      this.handleOnPress(tabBarItem.tabBarId);
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