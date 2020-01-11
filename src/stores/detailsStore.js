import {observable, action} from "mobx";
import service from "../service/http";
import remotedev from 'mobx-remotedev';
import {ListView} from "antd-mobile";
import {fromJS} from "immutable";
import moment from "moment";

@remotedev
class DetailsStore {

  // listView的数据源
  @observable detailsData = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
  });

  @observable listProps = {
    refreshing: false,
    loading: false,
    noMore: false,
    page: 1,
    rows: 8
  };

  @observable listDataArr = []; // 用于保存列表所有页的数据，由于listView数据源不能记住上一页的数据，所以要这样处理

  @observable dateTimeData = {
    year: moment().format("YYYY"),
    month: moment().format("MM")
  };

  @observable totalAmount = {
    income: 0,
    expend: 0
  };

  /**
   * 查询列表数据
   */
  @action
  queryCostList = () => {
    const newListProps = fromJS(this.listProps).toJS();
    const reqData = {
      page: this.listProps.page,
      rows: this.listProps.rows,
      year: this.dateTimeData.year,
      month: this.dateTimeData.month
    };
    service.post('/queryCostList', reqData, {params: 'form'}).then(({recorderList, monthSumData}) => {
      // 将刷新状态消除掉
      newListProps.refreshing = false;
      newListProps.loading = false;
      if (recorderList.length < newListProps.rows) {
        newListProps.noMore = true;
      } else {
        newListProps.noMore = false;
      }
      this.setListProps(newListProps);

      this.setListDataArr(recorderList);

      this.setTotalAmount({
        income: monthSumData[0].income,
        expend: monthSumData[0].pay
      })
    })
  };

  /**
   * 刷新列表的数据源
   */
  @action
  setDetailsData = () => {
    this.detailsData = this.detailsData.cloneWithRows(this.listDataArr);
  };

  /**
   * 设置列表的属性
   * @param data
   */
  @action
  setListProps = (data) => {
    this.listProps = data;
  };

  /**
   * 暂存列表的数据源供listView去刷新列表
   * @param data
   */
  @action
  setListDataArr = (data) => {
    this.listDataArr = [...this.listDataArr, ...data];
    this.setDetailsData();
  };

  @action
  setDateTimeData = (data) => {
    this.dateTimeData = data;
  };

  @action
  clearListDataArr = () => {
    this.listDataArr = [];
  }

  @action
  setTotalAmount = (data) => {
    this.totalAmount = data;
  }

}

const detailsStore = new DetailsStore();
export default detailsStore;