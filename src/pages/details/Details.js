import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Details.less";
import {observer, inject} from "mobx-react";
import {toJS} from "mobx";
import {PullToRefresh, ListView} from "antd-mobile";
import {fromJS} from "immutable";

@inject("detailsStore")
@observer
class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listViewHeight: 0,
    }
  }

  /**
   * 渲染行数据
   * @param rowData 行数据
   * @param sectionID 区块的ID
   * @param rowID 行的ID
   */
  renderRowData = (rowData, sectionID, rowID) => {
    return (
      <div key={rowData.id} className="clearfix rowWrapper">
        <div className="fl costType">
          <i className={`iconfont ${rowData.icon} costIcon`}></i>
          <span className="costName">{rowData.costConfigName}</span>
        </div>
        <div className="fr amount">
          ￥：{Number(rowData.balance).toFixed(2)}
        </div>
      </div>
    )
  };

  /**
   * 渲染行与行之间的分割线
   * @param sectionID
   * @param rowID
   */
  renderSeparator = (sectionID, rowID) => {
    return (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#f6f6f6',
        height: 8,
      }}/>
    )
  };

  onEndReached = () => {
    console.log("胡思思与")
    if (this.state.isLoading && !this.state.hasMore) {
      return null;
    }
  };

  onRefresh = () => {
    console.log("惠思雨")
    const {
      detailsStore: {
        setListProps,
        listProps
      }
    } = this.props;
    const newListProps = fromJS(listProps).toJS();
    newListProps.page = newListProps.page + 1;
    newListProps.refreshing = true;
    console.log(newListProps)
    setListProps(newListProps)

    // console.log(toJS(listProps))

  };

  render() {
    const {
      detailsStore: {
        detailsData,
        listProps: {
          refreshing,
          rows
        }
      }
    } = this.props;
    const {listViewHeight} = this.state;
    return (
      <div className="Details">

        <ListView
          dataSource={detailsData} // 数据源
          renderRow={this.renderRowData}
          renderSeparator={this.renderSeparator}
          ref={c => this.listView = c}
          style={{
            height: listViewHeight,
            overflow: 'auto'
          }}
          onScroll={() => {
          }}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={50}
          pullToRefresh={
            <PullToRefresh
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              direction={'up'}
            />
          }
          pageSize={rows}
        />
      </div>
    );
  }

  componentDidMount() {
    const {
      detailsStore: {
        queryCostList
      }
    } = this.props;
    queryCostList();
    const listViewHeight = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.listView).parentNode.offsetTop;
    this.setState({listViewHeight: listViewHeight - 50})
  }
}

export default Details;