import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import * as comHistory from '@utils/common-history';
import {observer, inject} from "mobx-react";
import "./Home.less";
import {Button, WingBlank, Grid, Flex} from "antd-mobile";
import * as colors from "../../utils/colors";

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
        <Grid
          data={menuData}
          renderItem={this.renderGridItem}
          onClick={this.gridItemClick}
        />
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