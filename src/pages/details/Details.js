import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./Details.less";
import {observer, inject} from "mobx-react";
import {toJS} from "mobx";
import {PullToRefresh, ListView, DatePicker, List} from "antd-mobile";
import {fromJS} from "immutable";
import moment from "moment";
import * as colors from "@utils/colors";

@inject("detailsStore")
@observer
class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listViewHeight: 0,
      datePickerVisible: false,
      dateValue: ''
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
          <i style={{color: `${colors.theme}`}} className={`iconfont ${rowData.icon} costIcon`}></i>
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
    if (this.state.isLoading && !this.state.hasMore) {
      return null;
    }
  };

  /**
   * 下拉刷新
   */
  onRefresh = () => {
    const {
      detailsStore: {
        setListProps,
        listProps,
        queryCostList
      }
    } = this.props;
    const newListProps = fromJS(listProps).toJS();
    if (newListProps.noMore)
      return;
    newListProps.page = newListProps.page + 1;
    newListProps.refreshing = true;
    newListProps.loading = true;
    setListProps(newListProps);

    setTimeout(() => {
      queryCostList();
    }, 1000);
    // console.log(toJS(listProps))

  };

  /**
   * 日期下拉框的值变化事件
   * @param value
   */
  handleDatePickerOk = (value) => {
    const {
      detailsStore: {
        setDateTimeData,
        queryCostList,
        listProps,
        setListProps,
        clearListDataArr
      }
    } = this.props;
    const newListProps = fromJS(listProps).toJS();
    newListProps.page = 1;
    setListProps(newListProps);
    clearListDataArr();
    setDateTimeData({
      year: moment(value).format("YYYY"),
      month: moment(value).format("MM")
    });
    this.setState({
      datePickerVisible: false,
      dateValue: value
    });
    queryCostList();
  };

  render() {
    const {
      detailsStore: {
        detailsData,
        listProps: {
          refreshing,
          rows,
          loading,
          noMore
        },
        dateTimeData: {
          year,
          month
        },
        totalAmount: {
          income,
          expend
        }
      }
    } = this.props;
    const {listViewHeight, datePickerVisible, dateValue} = this.state;
    return (
      <div className="Details">

        <div className="details-top-area clearfix">
          <div className="dateTime fl" onClick={() => {
            this.setState({datePickerVisible: true})
          }}>
            <div className="year">{year}年</div>
            <div className="month">{month}月 <i className="iconfont iconxia"></i></div>
          </div>
          <DatePicker
            visible={datePickerVisible}
            mode="month"
            value={dateValue}
            onOk={this.handleDatePickerOk}
            onDismiss={() => this.setState({datePickerVisible: false})}
          >
          </DatePicker>
          <div className="amount fr">
            <div className="amount-l">
              <div style={{color: "#666", fontSize: '12px'}}>收入</div>
              <div style={{marginTop: "15px", fontSize: '22px'}}>{income.toFixed(2)}</div>
            </div>
            <div className="amount-l">
              <div style={{color: "#666", fontSize: '12px'}}>支出</div>
              <div style={{marginTop: "15px", fontSize: '22px'}}>{expend.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <ListView
          dataSource={detailsData} // 数据源
          renderRow={this.renderRowData}
          renderSeparator={this.renderSeparator}
          renderFooter={() => (
            <div style={{padding: '30x', textAlign: "center"}}>
              {noMore ? '没有更多数据了哦~~~~~' : loading ? '正在加载中...' : ''}
            </div>
          )}
          ref={c => this.listView = c}
          style={{
            height: listViewHeight,
            overflow: 'auto',
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
    this.setState({listViewHeight: listViewHeight - 130})
  }

}

export default Details;