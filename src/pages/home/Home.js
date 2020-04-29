import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as comHistory from '@utils/common-history';
import {observer, inject} from "mobx-react";
import "./Home.less";
import {Button, WingBlank, Grid, Flex} from "antd-mobile";
import * as colors from "../../utils/colors";

import xiaomaolv from "../../asset/images/xiaomaolv.jpg";
import cf from "../../asset/images/qqqq.jpg";

@inject('homeStore')
@observer
class Home extends Component {

  constructor(props) {
    super(props);
  }

  /**
   * 自定义渲染Grid的Item
   * @param item
   * @param index
   */
  renderGridItem = (item, index) => {
    return (
      <div className="menu-item">
        <div className="menu-item-icon">
          <i style={{color: `${colors[`colors${index + 1}`]}`}}
             className={`iconfont ${item.icon}`}/>
        </div>
        <div className="menu-item-text">{item.text}</div>
      </div>
    )
  };

  /**
   * gridItem的点击事件
   * @param text
   */
  gridItemClick = ({text}) => {
    switch (text) {
      case "记账":
        comHistory.href(this, '/keeping-accounts', {})
        break;
      default:
        break;
    }
  };

  render() {
    const {
      homeStore: {menuData},
    } = this.props;
    return (
      <div className="page_home">
        <div id="aaa"></div>
        <Grid
          data={menuData}
          renderItem={this.renderGridItem}
          onClick={this.gridItemClick}
        />

        <div style={{width: "200px", height: "200px"}}>
          <img style={{width: "200px", height: "200px"}} src={xiaomaolv} alt=""/>
        </div>

        <div><img style={{width: "300px", height: "300px"}} src={cf} alt=""/></div>

        <div className="home-img"></div>
      </div>
    );
  }

  componentDidMount() {
    const {
      homeStore: {getMenu},
    } = this.props;
    getMenu();
  }
}

export default withRouter(Home);