import React, {Component} from 'react';
import {TabBar} from "antd-mobile";
import "./MyTabBar.less";

class MyTabBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabBarData: [
        {
          tabBarName: '首页',
          tabBarId: '首页',
        },
        {
          tabBarName: '我的',
          tabBarId: '首页',
        },
      ],
    }
  }

  render() {
    const {tabBarData, selectedTab} = this.state;
    return (
      <div className="myTabBar">
        {this.props.children}
        <TabBar>
          {
            tabBarData.length > 0 ?
              tabBarData.map(tabBarItem => {
                return (
                  <TabBar.Item
                    title={"首页"}
                    key={"首页"}
                    icon={
                      <div
                        style={
                          {
                            width: "22px",
                            height: "22px",
                            background: "url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat)"
                          }
                        }
                      >

                      </div>
                    }
                    selectedIcon={<div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                    }}
                    />}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                      this.setState({
                        selectedTab: 'blueTab',
                      });
                    }}
                  >

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

  }
}

export default MyTabBar;